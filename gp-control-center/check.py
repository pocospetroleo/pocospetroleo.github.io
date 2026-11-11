"""Monitor de disponibilidade; não executa código remoto nem altera apps."""
import concurrent.futures, datetime, json, pathlib, urllib.error, urllib.parse, urllib.request
from html.parser import HTMLParser
NAMES=['sondabm','gestao-pocos','gestao-pocos-operacional','bdo-operacional','sonolog','pocospetroleo.github.io','calculos-petroleo']
URLS={n:f'https://pocospetroleo.github.io/{n}/' for n in ['sondabm','gestao-pocos-operacional','bdo-operacional','calculos-petroleo']}
URLS['pocospetroleo.github.io']='https://pocospetroleo.github.io/'
EXTRA=[('Treino em 3D','https://pocospetroleo.github.io/fitcore-3d/'),('Modo Criador','https://pocospetroleo.github.io/modo-criador/'),('Mapa dos Poços','https://mapa-dos-pocos.xn--lucaspetrleo-8hb.com.br')]
def request(url):
    try:
        req=urllib.request.Request(url,headers={'User-Agent':'GP-Control-Monitor/2.0'})
        with urllib.request.urlopen(req,timeout=15) as r:return r.status,r.read(2000000),r.url
    except urllib.error.HTTPError as e:return e.code,b'',url
    except (OSError,ValueError):return None,b'',url
class Assets(HTMLParser):
    def __init__(self):super().__init__();self.paths=[]
    def handle_starttag(self,tag,attrs):
        a=dict(attrs)
        if tag=='script' and a.get('src'):self.paths.append(a['src'])
        if tag=='link' and 'stylesheet' in a.get('rel','') and a.get('href'):self.paths.append(a['href'])
def inspect_site(url):
    code,body,final=request(url);findings=[]
    if code is None or not 200<=code<400:return {'site_http':code,'site_status':'unreachable','findings':['Página indisponível ou consulta falhou'],'assets_checked':0}
    parser=Assets();parser.feed(body.decode('utf-8',errors='replace'));checked=0
    for path in dict.fromkeys(parser.paths):
        asset=urllib.parse.urljoin(final,path)
        if urllib.parse.urlsplit(asset).netloc!=urllib.parse.urlsplit(final).netloc:continue
        ac,data,_=request(asset);checked+=1
        if ac is None or not 200<=ac<400:findings.append('Arquivo indisponível: '+path)
        elif data.lstrip().lower().startswith((b'<!doctype html',b'<html')):findings.append('HTML recebido no lugar de arquivo: '+path)
    return {'site_http':code,'site_status':'reachable','findings':findings,'assets_checked':checked}
def check(name):
    code,data,_=request('https://api.github.com/repos/pocospetroleo/'+name)
    item={'name':name,'repository_http':code,'repository_status':'accessible' if code==200 else 'not_found_or_restricted' if code==404 else 'query_failed','site_status':'not_configured','findings':[]}
    if code==200:
        try:item['last_push']=json.loads(data).get('pushed_at')
        except (ValueError,TypeError):item['findings'].append('Resposta GitHub inválida')
    if name in URLS:item.update(inspect_site(URLS[name]))
    return item

def main():
    p=pathlib.Path(__file__).with_name('status.json')
    try:old=json.loads(p.read_text())
    except (OSError,ValueError):old={}
    with concurrent.futures.ThreadPoolExecutor(max_workers=8) as pool:
        results=list(pool.map(check,NAMES))
        results.extend(pool.map(lambda x:dict(name=x[0],repository_http=None,**inspect_site(x[1])),EXTRA))
    now=datetime.datetime.now(datetime.timezone.utc).isoformat()
    history=old.get('history',[])[-89:]+[{'checked_at':now,'sites_checked':sum(x['site_status']!='not_configured' for x in results),'sites_reachable':sum(x['site_status']=='reachable' for x in results)}]
    output={'generated_at':now,'results':results,'history':history,'scope':'Disponibilidade HTTP e arquivos JS/CSS locais. Login, cálculos e fluxos internos não testados.'}
    p.write_text(json.dumps(output,ensure_ascii=False,indent=2)+'\n')
    print(json.dumps({'checked':len(results),'findings':sum(len(x['findings']) for x in results)}))
if __name__=='__main__':main()
