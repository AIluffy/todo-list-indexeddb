import idb from 'idb'

const dbPromise = idb.open('todoList', 1, upgradeDB => {
    upgradeDB.createObjectStore('todos', {keyPath: 'id'})
})

const dbOper = {
    getAll() {
        return dbPromise.then(db => {
            return db.transaction('todos')
                    .objectStore('todos').getAll()
        })
    },
    delete(key) {
        return dbPromise.then(db => {
            const tx = db.transaction('todos', 'readwrite')
            tx.objectStore('todos').delete(key)

            return tx.complete
        })
    },
    add(val) {
        return dbPromise.then(db => {
            const tx = db.transaction('todos', 'readwrite')
            tx.objectStore('todos').put(val)

            return tx.complete
        })
    }
}

export default dbOper