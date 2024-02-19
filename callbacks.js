const readConfig = (name, callback) => {
    console.log(`(1) ${name} config is loaded`)
    callback(null, {name})
}

const findInDb = (statement, callback) => {
    console.log('(2) Query to MongoDB is executed ' + statement)
    callback(null, [{name: 'Sergey'}, {name: 'Vadim'}])
}

const httpGet = (url, callback) => {
    console.log('(3) Page is loaded ' + url)
    callback(null, '<div>Some archaic web is here</div>')
}

const readFile = (path, callback) => {
    console.log('(4) File is loaded')
    callback(null, 'file content')
}
// sequential call
// readConfig('myConfig', () => {})
// findInDb('db.myCollection.find({})', () => {})
// httpGet('https://localhost:3000', () => {})
// readFile('README.md', () => {})


// emulate async function
const asyncWrapper = fn => (...args) => {
    const time = Math.floor(Math.random()*1000)
    setTimeout(() => {
        fn(...args)
    }, time)
}

// wrap
const wrappedReadConfig = asyncWrapper(readConfig)
const wrappedFindInDb = asyncWrapper(findInDb)
const wrappedHttpGet = asyncWrapper(httpGet)
const wrappedReadFile = asyncWrapper(readFile)

// async call
// wrappedReadConfig('myConfig', () => {})
// wrappedFindInDb('db.myCollection.find({})', () => {})
// wrappedHttpGet('https://localhost:3000', () => {})
// wrappedReadFile('README.md', () => {})


// callback hell
wrappedReadConfig('myConfig', () => {
    wrappedFindInDb('db.myCollection.find({})', () => {
        wrappedHttpGet('https://localhost:3000', () => {
            wrappedReadFile('README.md', () => {})
        })
    })
})