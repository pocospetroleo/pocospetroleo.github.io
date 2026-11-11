import json,datetime,urllib.request,urllib.error,time,pathlib
names=['sondabm','gestao-pocos','gestao-pocos-operacional','bdo-operacional','sonolog','pocospetroleo.github.io','calculos-petroleo']
urls={'sondabm':'https://pocospetroleo.github.io/sondabm/','gestao-pocos-operacional':'https://pocospetroleo.github.io/gestao-pocos-operacional/','bdo-operacional':'https://pocospetroleo.github.io/bdo-operacional/','calculos-petroleo':'https://pocospetroleo.github.io/calculos-petroleo/'}
def request(url):
 try:
  with urllib.request.urlopen(urllib.request.Request(url,headers={'User-Agent':'GP-Control-Monitor/1.0','Accept':'application/vnd.github+json'}),timeout=12) as r:return r.status,r.read(100000)
 except urllib.error.HTTPError as e:return e.code,b''
 except Exception:return None,b''
p=pathlib.Path('gp-control-center/status.json')
try:old=json.loads(p.read_text())
except Exception:old={}
now=datetime.datetime.now(datetime.timezone.utc).isoformat()
results=[]
for n in names:
 code,data=request('https://api.github.com/repos/pocospetroleo/'+n)
 item={'name':n,'repository_http':code,'site_status':'not_configured'}
 if code==200:
  try:item['last_push']=json.loads(data).get('pushed_at')
  except Exception:pass
 if n in urls:
  sc,_=request(urls[n]);item['site_http']=sc;item['site_status']='reachable' if sc is not None and 200<=sc<400 else 'unreachable'
 results.append(item)
history=old.get('history',[])[-89:]
history.append({'checked_at':now,'sites_checked':sum(x['site_status']!='not_configured' for x in results),'sites_reachable':sum(x['site_status']=='reachable' for x in results)})
p.write_text(json.dumps({'generated_at':now,'results':results,'history':history},ensure_ascii=False,indent=2)+'\n')
