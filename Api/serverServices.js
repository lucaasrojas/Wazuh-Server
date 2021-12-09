const tasks = {
    get: ({ data, offset = 0, limit = 10, title, completed, userId }) => {
        const arrOffset = Number(offset)
        const arrLimit = Number(limit)
        let filteredArray = [...data]

        if (userId) {
            filteredArray = filteredArray.filter(el => el.user_id === Number(userId))
        }
        if (completed) {
            filteredArray = filteredArray.filter(el => el.completed)
        }
        if (title) {
            filteredArray = filteredArray.filter(el => el.title.toLowerCase().includes(title.toLowerCase()))
        }

        const end = filteredArray.length > (arrOffset + arrLimit) ? (arrOffset + arrLimit) : undefined
        let slicedArray = filteredArray.slice(arrOffset, end)
        return {
            total_items: filteredArray.length,
            data: slicedArray
        }
    },
    getById: ({ data, id }) => {
        return data.filter(task => task.id === Number(id))[0]
    }
}

const users = {
    get: ({ data }) => {
        return {
            total_items: data.length,
            data: data
        }
    },
    getById: ({ data, id }) => {
        const user = data.filter(user => user.id === Number(id))[0]
        return user
    },
    getTasksFromUser: ({ data, id, offset = 0, limit = 10, completed, title }) => {
        const userId = Number(id)
        const arrOffset = Number(offset)
        const arrLimit = Number(limit) + Number(offset)
        let filteredArray = data.filter(task => task.user_id === userId)

        if (completed) {
            filteredArray = filteredArray.filter(el => el.completed)
        }
        if (title) {
            filteredArray = filteredArray.filter(el => el.title.includes(title))
        }
        filteredArray = filteredArray.slice(arrOffset, arrLimit)

        return {
            total_items: filteredArray.length,
            data: filteredArray
        }
    }
}

module.exports = {
    tasks,
    users
}