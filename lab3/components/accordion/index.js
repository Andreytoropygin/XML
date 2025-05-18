import { concatenateLectures, eraseLectures, countLecturesPrefixes, anagramLectures } from "../../func.js";

export class AccordionComponent {
    constructor(parent) {
        this.parent = parent;
        this.words = [];

        this.eraseLecturesInput = this.eraseLecturesInput.bind(this);
        this.prefixLecturesInput = this.prefixLecturesInput.bind(this);
        this.prefixInput = this.prefixInput.bind(this);
        this.anagramsLecturesInput = this.anagramsLecturesInput.bind(this);
    }

    getHTML(data, semId) {
        let sem = data.find(sem => sem.id == semId);
        const example = [0, 1, false, 2, undefined, '', 3, null];
        const ex_words = ["a", "b", "ab", "bc", "abc", "abcd"];
        const ex_str = "abc";
        const anagrams = ["dcba", "aabb", "aba", "acdb", "bbaa"];
        return `
            <div class="accordion accordion-flush" id="accordionFlushExample">
                <div class="accordion-item">
                    <h2 class="accordion-header" id="flush-headingOne">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                        Лекции
                    </button>
                    </h2>
                    <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne">
                        <div class="accordion-body">
                            ${concatenateLectures(eraseLectures(sem.lectures), "<br>")}
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
                            ${concatenateLectures(eraseLectures(sem.seminars), "<br>")}
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
                            ${concatenateLectures(eraseLectures(sem.labWorks), "<br>")}
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
                                <input id="eraseLectures-input" type="text"/>
                            </div>
                            <strong>Очищенный массив:</strong>
                            <div id="erased-array"></div>
                            <strong>Пример:</strong>
                            <label>исходный массив: ${concatenateLectures(example, ", ")}; очищенный массив: ${concatenateLectures(eraseLectures(example), ", ")}.</label>
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
                            <label>массив: ${concatenateLectures(ex_words, ", ")}; строка: ${ex_str}; префиксов: ${countLecturesPrefixes(ex_words, ex_str)}</label>
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
                            <label>Массив: ${concatenateLectures(anagrams, ", ")}</label><br>
                            <label>Анаграммы:</label>
                            <div>${concatenateLectures(eraseLectures(anagramLectures(anagrams)), "<br>")}</div>
                        </div>
                    </div>
                </div>
            </div>
        `
    }

    eraseLecturesInput(event) {
        document.getElementById("erased-array").innerHTML = concatenateLectures(eraseLectures(event.target.value
            .split(', ').join(',').split(',')), ', ');
    }

    prefixLecturesInput(event) {
        this.words = event.target.value.split(', ').join(',').split(',');
    }

    prefixInput(event) {
        let count = 0
        if (this.words.length > 0) {
            count = countLecturesPrefixes(this.words, event.target.value)
        }
        document.getElementById("prefix-count").innerHTML = count;
    }

    anagramsLecturesInput(event) {
        const array = event.target.value.split(', ').join(',').split(',');
        document.getElementById("anagrams").innerHTML = concatenateLectures(eraseLectures(anagramLectures(array)), "<br>");
    }

    render(data, semId) {
        this.parent.innerHTML = '';
        this.parent.insertAdjacentHTML('beforeend', this.getHTML(data, semId));
        document.getElementById("eraseLectures-input").addEventListener("change", this.eraseLecturesInput);
        document.getElementById("words-input").addEventListener("change", this.prefixLecturesInput);
        document.getElementById("str-input").addEventListener("change", this.prefixInput);
        document.getElementById("anagrams-input").addEventListener("change", this.anagramsLecturesInput);
    }
}
