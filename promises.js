const promise = new Promise((resolve, reject) => {
    let counter = 0
    const timer = setInterval(() => {
        counter++
        if (counter === 5) {
            resolve('5 seconds passed!')
            clearInterval(timer)
        }
    }, 1000)
})

promise
    .then(res => console.log(res))
    .catch(error => error)

// ===================================================================================== //
const iterable = []

// STATIC METHODS OF PROMISES
Promise.all(iterable) /*– ожидает выполнения всех промисов и возвращает массив с результатами.
Если любой из указанных промисов вернёт ошибку, то результатом работы Promise.all будет эта ошибка,
результаты остальных промисов будут игнорироваться.*/
Promise.allSettled(iterable) /*- ждёт, пока все промисы завершатся и возвращает их результаты
в виде массива с объектами, у каждого объекта два свойства:
    status: "fulfilled", если выполнен успешно или "rejected", если ошибка,
    value – результат, если успешно или reason – ошибка, если нет.*/
Promise.race(iterable) /*– ожидает первый выполненный промис, который становится его результатом, остальные игнорируются.*/
Promise.any(iterable) /*– ожидает первый успешно выполненный промис, который становится его результатом, остальные игнорируются.
Если все переданные промисы отклонены, AggregateError становится ошибкой Promise.any.*/
Promise.resolve('value') /*– возвращает успешно выполнившийся промис с результатом value.*/
Promise.reject(new Error) /*– возвращает промис с ошибкой error.*/

// ===================================================================================== //

const promisify = fn => (...args) => new Promise((resolve, reject) => {
    const callback = (error, result) => {
        if (error) {
            reject(error)
        } else {
            resolve(result)
        }
    }
    args.push(callback)
    fn(...args)
})

// util.promisify в Node.js.