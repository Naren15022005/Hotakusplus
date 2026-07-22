"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FrontendController = void 0;
const common_1 = require("@nestjs/common");
let FrontendController = class FrontendController {
    index() {
        return `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Hotakusplus — API Tester</title>
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,sans-serif;background:#0f0f11;color:#e4e4e7;padding:2rem;max-width:1000px;margin:0 auto}
h1{color:#a855f7;margin-bottom:.25rem}
.sub{color:#71717a;margin-bottom:2rem;font-size:.9rem}
.card{background:#18181b;border:1px solid #27272a;border-radius:8px;padding:1.25rem;margin-bottom:1rem}
.card h3{font-size:.95rem;color:#a1a1aa;margin-bottom:.75rem;text-transform:uppercase;letter-spacing:.05em}
.row{display:flex;gap:.5rem;flex-wrap:wrap;margin-bottom:.75rem}
input,select,button{background:#27272a;border:1px solid #3f3f46;color:#e4e4e7;padding:.5rem .75rem;border-radius:6px;font-size:.875rem;flex:1;min-width:150px}
button{background:#7c3aed;border-color:#7c3aed;cursor:pointer;font-weight:600;flex:0;min-width:auto}
button:hover{background:#6d28d9}
pre{background:#09090b;border:1px solid #27272a;border-radius:6px;padding:1rem;overflow-x:auto;font-size:.8125rem;line-height:1.5;max-height:500px;overflow-y:auto;white-space:pre-wrap;word-break:break-all}
.error{color:#ef4444}
.loading{color:#a855f7;animation:pulse 1.5s infinite}
.url{color:#3b82f6;font-size:.8rem;margin-top:.25rem;word-break:break-all}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}
</style>
</head>
<body>
<h1>Hotakusplus</h1>
<p class="sub">API Tester — datos en vivo desde la API externa</p>

<div class="card">
  <h3>Hanime.tv</h3>
  <div class="row">
    <input id="hanimeQuery" placeholder="Buscar..." value="pokemon">
    <button onclick="callAPI('/api/hanime/search/'+encodeURIComponent(document.getElementById('hanimeQuery').value),'hanimeRes')">Buscar</button>
  </div>
  <div class="row">
    <input id="hanimeSlug" placeholder="Slug...">
    <button onclick="callAPI('/api/hanime/'+encodeURIComponent(document.getElementById('hanimeSlug').value),'hanimeRes')">Detalle</button>
    <button onclick="callAPI('/api/hanime/streams/'+encodeURIComponent(document.getElementById('hanimeSlug').value),'hanimeRes')">Streams</button>
  </div>
  <div id="hanimeRes" class="url"></div>
  <pre id="hanimePre">Esperando consulta...</pre>
</div>

<div class="card">
  <h3>HentaiHaven</h3>
  <div class="row">
    <input id="hhQuery" placeholder="Buscar..." value="naruto">
    <button onclick="callAPI('/api/hh/search/'+encodeURIComponent(document.getElementById('hhQuery').value),'hhRes')">Buscar</button>
  </div>
  <div class="row">
    <input id="hhId" placeholder="ID...">
    <button onclick="callAPI('/api/hh/'+encodeURIComponent(document.getElementById('hhId').value),'hhRes')">Detalle</button>
    <button onclick="callAPI('/api/hh/sources/'+encodeURIComponent(document.getElementById('hhId').value),'hhRes')">Sources</button>
  </div>
  <div id="hhRes" class="url"></div>
  <pre id="hhPre">Esperando consulta...</pre>
</div>

<div class="card">
  <h3>Rule34</h3>
  <div class="row">
    <input id="r34Query" placeholder="Autocompletar / buscar..." value="cat">
    <button onclick="callAPI('/api/r34/autocomplete/'+encodeURIComponent(document.getElementById('r34Query').value),'r34Res')">Autocomplete</button>
    <button onclick="callAPI('/api/r34/search/'+encodeURIComponent(document.getElementById('r34Query').value),'r34Res')">Buscar</button>
  </div>
  <div class="row">
    <input id="r34Id" placeholder="ID de imagen...">
    <button onclick="callAPI('/api/r34/'+encodeURIComponent(document.getElementById('r34Id').value),'r34Res')">Detalle</button>
  </div>
  <div id="r34Res" class="url"></div>
  <pre id="r34Pre">Esperando consulta...</pre>
</div>

<script>
async function callAPI(path,resId){
  const pre=document.getElementById(resId.replace('Res','Pre'));
  const urlEl=document.getElementById(resId);
  pre.textContent='Cargando...';
  pre.className='loading';
  urlEl.textContent='';
  try{
    const r=await fetch(path);
    urlEl.textContent=\`GET \${window.location.origin}\${path} → \${r.status} \${r.statusText}\`;
    if(!r.ok){
      const txt=await r.text();
      pre.textContent=txt;
      pre.className='error';
      return;
    }
    const data=await r.json();
    pre.textContent=JSON.stringify(data,null,2);
    pre.className='';
  }catch(e){
    pre.textContent=\`Error: \${e.message}\`;
    pre.className='error';
  }
}
</script>
</body>
</html>`;
    }
};
exports.FrontendController = FrontendController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.Header)('Content-Type', 'text/html'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], FrontendController.prototype, "index", null);
exports.FrontendController = FrontendController = __decorate([
    (0, common_1.Controller)()
], FrontendController);
//# sourceMappingURL=frontend.controller.js.map