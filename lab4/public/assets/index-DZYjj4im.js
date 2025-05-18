(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const n of s)if(n.type==="childList")for(const o of n.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function e(s){const n={};return s.integrity&&(n.integrity=s.integrity),s.referrerPolicy&&(n.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?n.credentials="include":s.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function r(s){if(s.ep)return;s.ep=!0;const n=e(s);fetch(s.href,n)}})();class x{constructor(t){this.parent=t}getHTML(t){return`
            <div class="card my_card" style="width: 300px;">
                <img src="${t.src}" class="card-img-top my_img" alt="${t.title}">
                <div class="card-body">
                    <h5 class="card-title">${t.title}</h5>
                    <p class="card-text">${t.text}</p>
                    <button class="btn btn-primary details" id="click-card-${t.id}" data-id="${t.id}">Подробнее</button>
                    <button class="btn btn-primary details" id="edit-card-${t.id}" data-id="${t.id}">Редактировать</button>
                </div>
            </div>
        `}addListeners(t,e,r){document.getElementById(`click-card-${t.id}`).addEventListener("click",e),document.getElementById(`edit-card-${t.id}`).addEventListener("click",r)}render(t,e,r){const s=this.getHTML(t);this.parent.insertAdjacentHTML("beforeend",s),this.addListeners(t,e,r)}}class u{constructor(t){this.parent=t}getHTML(){return`
            <button id="back-button" class="btn btn-primary mt-3 my_btn" type="button">
                <i class="bi bi-arrow-left"></i> Назад
            </button>
        `}addListeners(t){document.getElementById("back-button").addEventListener("click",t)}render(t){const e=this.getHTML();this.parent.insertAdjacentHTML("beforeend",e),this.addListeners(t)}}function i(a,t){return a.join(t)}function d(a){return a.filter(t=>t&&t!=0&&t!="false"&&t!="null"&&t!="undefined")}function b(a,t){let e=0;return a.forEach(r=>e+=t.startsWith(r)),e}function g(a){let t=a.map(s=>s.split("").sort().join("")),e=new Map,r=[];return t.forEach(s=>e.set(s,[])),a.forEach((s,n)=>{let o=e.get(t[n]);o.push(s),e.set(t[n],o)}),e.forEach(s=>s.length>1?r.push(s.sort().join(", ")):null),r}class M{constructor(t){this.parent=t,this.words=[],this.eraseInput=this.eraseInput.bind(this),this.wordsInput=this.wordsInput.bind(this),this.strInput=this.strInput.bind(this),this.anagramsInput=this.anagramsInput.bind(this)}getHTML(t){const e=[0,1,!1,2,void 0,"",3,null],r=["a","b","ab","bc","abc","abcd"],s="abc",n=["dcba","aabb","aba","acdb","bbaa"];return`
            <div class="accordion accordion-flush" id="accordionFlushExample">
                <div class="accordion-item">
                    <h2 class="accordion-header" id="flush-headingOne">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                        Лекции
                    </button>
                    </h2>
                    <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne">
                        <div class="accordion-body">
                            ${i(d(t.lectures),"<br>")}
                        </div>
                    </div>
                </div>
                <div class="accordion-item">
                    <h2 class="accordion-header" id="flush-headingTwo">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                        Семинары
                    </button>
                    </h2>
                    <div id="flush-collapseTwo" class="accordion-collapse collapse" aria-labelledby="flush-headingTwo">
                        <div class="accordion-body">
                            ${i(d(t.seminars),"<br>")}
                        </div>
                    </div>
                </div>
                <div class="accordion-item">
                    <h2 class="accordion-header" id="flush-headingThree">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                        Лабораторные работы
                    </button>
                    </h2>
                    <div id="flush-collapseThree" class="accordion-collapse collapse" aria-labelledby="flush-headingThree">
                        <div class="accordion-body">
                            ${i(d(t.labWorks),"<br>")}
                        </div>
                    </div>
                </div>
                <div class="accordion-item">
                    <h2 class="accordion-header" id="flush-headingFour">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseFour" aria-expanded="false" aria-controls="flush-collapseFour">
                        Очистка массива
                    </button>
                    </h2>
                    <div id="flush-collapseFour" class="accordion-collapse collapse" aria-labelledby="flush-headingFour">
                        <div class="accordion-body">
                            <strong>Введите массив:</strong>
                            <div>
                                <input id="erase-input" type="text"/>
                            </div>
                            <strong>Очищенный массив:</strong>
                            <div id="erased-array"></div>
                            <strong>Пример:</strong>
                            <label>исходный массив: ${i(e,", ")}; очищенный массив: ${i(d(e),", ")}.</label>
                        </div>
                    </div>
                </div>
                <div class="accordion-item">
                    <h2 class="accordion-header" id="flush-headingFifth">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseFifth" aria-expanded="false" aria-controls="flush-collapseFifth">
                        Префиксы
                    </button>
                    </h2>
                    <div id="flush-collapseFifth" class="accordion-collapse collapse" aria-labelledby="flush-headingFifth">
                        <div class="accordion-body">
                            <strong>Введите массив:</strong>
                            <div>
                                <input id="words-input" type="text" inputmode="latin"/>
                            </div>
                            <strong>Введите строку:</strong>
                            <div>
                                <input id="str-input" type="text" inputmode="latin"/>
                            </div>
                            <strong>Префиксов: </strong><label id="prefix-count"></label><br>
                            <strong>Пример:</strong>
                            <label>массив: ${i(r,", ")}; строка: ${s}; префиксов: ${b(r,s)}</label>
                        </div>
                    </div>
                </div>
                <div class="accordion-item">
                    <h2 class="accordion-header" id="flush-headingSixth">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseSixth" aria-expanded="false" aria-controls="flush-collapseSixth">
                        Анаграммы
                    </button>
                    </h2>
                    <div id="flush-collapseSixth" class="accordion-collapse collapse" aria-labelledby="flush-headingSixth">
                        <div class="accordion-body">
                            <strong>Введите массив:</strong>
                            <div>
                                <input id="anagrams-input" type="text"/>
                            </div>
                            <strong>Анаграммы:</strong>
                            <div id="anagrams"></div>

                            <strong>Пример:</strong><br>
                            <label>Массив: ${i(n,", ")}</label><br>
                            <label>Анаграммы:</label>
                            <div>${i(d(g(n)),"<br>")}</div>
                        </div>
                    </div>
                </div>
            </div>
        `}eraseInput(t){document.getElementById("erased-array").innerHTML=i(d(t.target.value.split(", ").join(",").split(",")),", ")}wordsInput(t){this.words=t.target.value.split(", ").join(",").split(",")}strInput(t){let e=0;this.words.length>0&&(e=b(this.words,t.target.value)),document.getElementById("prefix-count").innerHTML=e}anagramsInput(t){const e=t.target.value.split(", ").join(",").split(",");document.getElementById("anagrams").innerHTML=i(d(g(e)),"<br>")}render(t){this.parent.innerHTML="",this.parent.insertAdjacentHTML("beforeend",this.getHTML(t)),document.getElementById("erase-input").addEventListener("change",this.eraseInput),document.getElementById("words-input").addEventListener("change",this.wordsInput),document.getElementById("str-input").addEventListener("change",this.strInput),document.getElementById("anagrams-input").addEventListener("change",this.anagramsInput)}}class k{constructor(){this.baseUrl="http://localhost:3000"}getSemesters(){return`${this.baseUrl}/semesters`}getSemesterById(t){return`${this.baseUrl}/semesters/${t}`}createSemester(){return`${this.baseUrl}/semesters`}removeSemesterById(t){return`${this.baseUrl}/semesters/${t}`}updateSemesterById(t){return`${this.baseUrl}/semesters/${t}`}}const l=new k;class H{constructor(t,e){this.parent=t,this.semId=e}get pageRoot(){return document.getElementById("sem-page")}getHTML(t){return`
            <div id="sem-page" class="container mt-5 form-container">
                <h2 class="text-center mb-4">${t}</h2>
                <div class="accordion-container"></div>
                <div class="buttons-container"></div>
            </div>
        `}async render(){try{const t=await fetch(l.getSemesterById(this.semId));if(!t.ok)throw new Error(`HTTP error! status: ${t.status}`);const e=await t.json();this.parent.innerHTML="",this.parent.insertAdjacentHTML("beforeend",this.getHTML(e.title));const r=this.pageRoot.querySelector(".accordion-container");new M(r).render(e);const n=this.pageRoot.querySelector(".buttons-container");new u(n).render(this.goBack.bind(this))}catch(t){console.error("Ошибка при загрузке данных семестра:",t),this.parent.innerHTML='<p class="error">Не удалось загрузить данные семестра</p>';const e=document.createElement("div");this.parent.appendChild(e),new u(e).render(this.goBack.bind(this))}}goBack(){new h(this.parent).render()}}class C{constructor(t){this.parent=t}getHTML(t,e){const r={Все:"all","1 курс":"1","2 курс":"2"};return t.map(s=>`
            <button 
                class="filter-button ${r[s]===e?"active":""}"
                data-filter="${r[s]}"
            >
                ${s}
            </button>
        `).join("")}render(t,e){const r=this.getHTML(t,"all");this.parent.innerHTML=r,this.parent.querySelectorAll(".filter-button").forEach(s=>{s.addEventListener("click",n=>{const o=n.target.dataset.filter;this.updateActiveButton(o),e(o)})})}updateActiveButton(t){this.parent.querySelectorAll(".filter-button").forEach(e=>{e.classList.remove("active"),e.dataset.filter===t&&e.classList.add("active")})}}class j{constructor(t){this.parent=t}getHTML(){return`
            <button id="add-button" class="btn btn-primary mt-3 my_btn" type="button">
                Добавить
            </button>
        `}addListeners(t){document.getElementById("add-button").addEventListener("click",t)}render(t){const e=this.getHTML();this.parent.insertAdjacentHTML("beforeend",e),this.addListeners(t)}}class q{constructor(t){this.parent=t}render(t,e=null){const r=e?e.title:"",s=e?e.src:"",n=e?e.text:"",o=e?e.course:"",p=e?e.lectures:"",f=e?e.seminars:"",y=e?e.labWorks:"",v=`
            <form id="SemesterForm" class="container mt-5 form">
                <input type="text" id="title" placeholder="Title" value="${r}" required>
                <input type="text" id="src" placeholder="Image URL" value="${s}" required>
                <textarea id="text" placeholder="Text" required>${n}</textarea>
                <input type="number" id="course" placeholder="Course" value="${o}" required>
                <textarea id="lectures" placeholder="Lectures" required>${e?p.join("; "):""}</textarea>
                <textarea id="seminars" placeholder="Seminars" required>${e?f.join("; "):""}</textarea>
                <textarea id="labWorks" placeholder="LabWorks" required>${e?y.join("; "):""}</textarea>
                <button class="btn btn-primary details" type="submit">${e?"Обновить":"Добавить"} семестр</button>
            </form>
        `;this.parent.insertAdjacentHTML("beforeend",v);const c=this.parent.querySelector("#SemesterForm");c.addEventListener("submit",L=>{L.preventDefault();const T=c.querySelector("#title").value,w=c.querySelector("#src").value,B=c.querySelector("#text").value,S=parseInt(c.querySelector("#course").value),I=c.querySelector("#lectures").value.split(";").join("; ").split("; "),E=c.querySelector("#seminars").value.split(";").join("; ").split("; "),$=c.querySelector("#labWorks").value.split(";").join("; ").split("; ");t({title:T,src:w,text:B,course:S,lectures:I,seminars:E,labWorks:$})})}}class P{constructor(t){this.parent=t}getHTML(){return`
            <button id="delete-button" class="btn btn-primary mt-3 my_btn" type="button">
                Удалить
            </button>
        `}addListeners(t){document.getElementById("delete-button").addEventListener("click",t)}render(t){const e=this.getHTML();this.parent.insertAdjacentHTML("beforeend",e),this.addListeners(t)}}class m{constructor(t,e=null){this.parent=t,this.semId=e}get pageRoot(){return document.getElementById("edit-page")}getHTML(){return`
            <div id="edit-page" class="container mt-5">
                <h2 class="text-center mb-4">${this.semId?"Редактировать семестр":"Создать семестр"}</h1>
                <div class="form-container"></div>
                <div class="buttons-container"></div>
            </div>
        `}async addSemester(t){try{const e=await fetch(l.createSemester(),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)});e.status===201?this.goBack():console.error("Ошибка при создании семестра:",e.status)}catch(e){console.error("Ошибка сети:",e)}}async updateSemester(t){try{const e=await fetch(l.updateSemesterById(this.semId),{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)});e.status===200?this.goBack():console.error("Ошибка при обновлении семестра:",e.status)}catch(e){console.error("Ошибка сети:",e)}}async render(){this.parent.innerHTML="",this.parent.insertAdjacentHTML("beforeend",this.getHTML()),await new Promise(n=>setTimeout(n,0));const t=this.pageRoot.querySelector(".form-container"),e=new q(t);if(this.semId)try{const n=await fetch(l.getSemesterById(this.semId));if(!n.ok)throw new Error(`HTTP error! status: ${n.status}`);const o=await n.json();e.render(this.updateSemester.bind(this),o),new P(this.pageRoot.querySelector(".buttons-container")).render(this.onClickDelete.bind(this))}catch(n){console.error("Ошибка при загрузке семестра:",n)}else e.render(this.addSemester.bind(this));const r=this.pageRoot.querySelector(".buttons-container");new u(r).render(this.goBack.bind(this))}async onClickDelete(){try{const t=await fetch(l.removeSemesterById(this.semId),{method:"DELETE"});t.status===200?this.goBack():console.error("Ошибка при удалении семестра:",t.status)}catch(t){console.error("Ошибка сети:",t)}}goBack(){new h(this.parent).render()}}class h{constructor(t){this.parent=t,this.data=[]}async getData(){try{const t=await fetch(l.getSemesters());if(!t.ok)throw new Error(`HTTP error! status: ${t.status}`);const e=await t.json();this.data=e,this.showFilteredSemesters(e,"all")}catch(t){console.error("Ошибка при загрузке данных:",t)}}get pageRoot(){return document.getElementById("main-page")}getHTML(){return`
            <div id="main-page" class="container mt-5">
                <div class="filter-buttons"></div>
                <div class="gallery-container">
                    <div class="gallery"></div>
                </div>
                <div class="add-delete-btns-container">
                    <div class="add-delete-buttons"></div>
                </div>
            </div>
        `}render(){this.parent.innerHTML="",this.parent.insertAdjacentHTML("beforeend",this.getHTML());const t=["Все","1 курс","2 курс"];new C(this.pageRoot.querySelector(".filter-buttons")).render(t,this.onFilterChange.bind(this)),this.getData(),new j(this.pageRoot.querySelector(".add-delete-buttons")).render(this.onClickAdd.bind(this))}onClickAdd(){new m(this.parent).render()}onClickUpdate(t){const e=t.target.dataset.id;new m(this.parent,e).render()}onClickCard(t){const e=t.target.dataset.id;new H(this.parent,e).render()}onFilterChange(t){this.showFilteredSemesters(this.data,t)}showFilteredSemesters(t,e){const r=this.pageRoot.querySelector(".gallery");r.innerHTML="",t.forEach(s=>{(s.course==e||e==="all")&&new x(r).render(s,this.onClickCard.bind(this),this.onClickUpdate.bind(this))})}}document.addEventListener("DOMContentLoaded",()=>{const a=document.getElementById("root");new h(a).render()});
