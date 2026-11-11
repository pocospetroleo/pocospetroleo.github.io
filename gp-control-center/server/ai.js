export function integrationConfig(env) {
  const openai = Boolean(env('OPENAI_API_KEY'));
  const claude = Boolean(env('ANTHROPIC_API_KEY') && (env('GPCC_CLAUDE_MODEL') || env('NASMIDIAS_CLAUDE_MODEL')));
  return { openai, claude, ai: openai || claude };
}

export async function testOpenAI(env) {
  const key = env('OPENAI_API_KEY');
  if (!key) return { connected: false, status: 'missing_key', message: 'Cadastre OPENAI_API_KEY nos segredos do servidor.' };
  const response = await fetch('https://api.openai.com/v1/models', {
    headers: { Authorization: 'Bearer ' + key },
    signal: AbortSignal.timeout(15000)
  });
  await response.body?.cancel();
  return {
    connected: response.ok,
    status: response.ok ? 'connected' : 'provider_error',
    http: response.status,
    message: response.ok ? 'OpenAI autenticada com sucesso.' : 'OpenAI retornou HTTP ' + response.status + '. Confira a chave e suas permissões.'
  };
}

export async function analyzeWithAI(env, prompt) {
  if (env('OPENAI_API_KEY')) {
    const schema = {
      type: 'object', additionalProperties: false,
      properties: { reason: {type:'string'}, old: {type:'string'}, new: {type:'string'}, tests: {type:'array',items:{type:'string'}} },
      required: ['reason','old','new','tests']
    };
    const response = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: { Authorization: 'Bearer ' + env('OPENAI_API_KEY'), 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: env('GPCC_OPENAI_MODEL') || 'gpt-4.1-mini',
        input: prompt, store: false, max_output_tokens: 4000,
        text: { format: { type: 'json_schema', name: 'repair_proposal', strict: true, schema } }
      }),
      signal: AbortSignal.timeout(60000)
    });
    if (!response.ok) {
      await response.body?.cancel();
      throw Error('OpenAI retornou HTTP ' + response.status + '. Confira permissões, créditos e limites da API.');
    }
    const data = await response.json();
    if (data.status !== 'completed') throw Error('A OpenAI não concluiu a análise. Tente novamente.');
    const text = (data.output || []).flatMap(item => item.content || []).filter(item => item.type === 'output_text').map(item => item.text).join('');
    return JSON.parse(text);
  }
  const key = env('ANTHROPIC_API_KEY');
  const model = env('GPCC_CLAUDE_MODEL') || env('NASMIDIAS_CLAUDE_MODEL');
  if (!key || !model) throw Error('Configure OPENAI_API_KEY ou a integração Claude no servidor.');
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method:'POST',
    headers:{'x-api-key':key,'anthropic-version':'2023-06-01','content-type':'application/json'},
    body:JSON.stringify({model,max_tokens:4000,messages:[{role:'user',content:prompt}]}),
    signal:AbortSignal.timeout(60000)
  });
  if (!response.ok) {
    await response.body?.cancel();
    throw Error('Claude retornou HTTP ' + response.status);
  }
  const data = await response.json();
  const text = data.content.filter(item => item.type === 'text').map(item => item.text).join('');
  return JSON.parse(text.replace(/^\`\`\`(?:json)?\s*/, '').replace(/\s*\`\`\`$/, ''));
}
