const key = 'parcialRecipesToInclude'
const LocalApi = {
    add(item) {
        const partialList = localStorage.getItem(key)

        if(partialList) {
            const serializedList = this.getList()
            serializedList.push(item);
            setList(serializedList)
        }
    },
    getItem(_id) {
        const serializedList = this.getList()
        return serializedList.filter(item => item._id === _id).pop()
    },
    removeItem() {
        const serializedList = this.getList()
        const newList = serializedList.filter(item => item._id !== _id)
        setList(newList)
    },
    getList() {
        try {
            return JSON.parse(partialList)
        } catch (error) {
            throw new Error('It was not possible to parse the list')
        }
    },
    deleteList() {
        setList(null)
        localStorage.removeItem(key)
    }
}

function setList(serializedList) {
    try {
        localStorage.setItem(key, JSON.stringify(serializedList))
    } catch (error) {
        throw new Error('It was not possible to stringify the list')
    }
}