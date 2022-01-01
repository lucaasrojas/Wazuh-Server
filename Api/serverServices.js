const AppError = require('../Utils/AppError')

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
        const task = data.filter(task => task.id === Number(id))[0]
        if (!task) {
            return {
                status: 404,
                json: {
                    message: `Task with ID ${id} was not found`,
                    status: "fail"
                }
            }
        }
        return {
            status: 200,
            json: task
        }
    }
}

const users = {
    get: ({ data }) => {
        return {
            status: 200,
            json: {
                total_items: data.length,
                data: data
            }
        }
    },
    getById: ({ data, id, res }) => {
        const user = data.filter(user => user.id === Number(id))[0]

        if (!user) {
            return {
                status: 404,
                json: {
                    message: `User with ID ${id} was not found`,
                    status: "fail"
                }
            }
        }
        return {
            status: 200,
            json: user
        }
    },
    getTasksFromUser: ({ data, id, offset = 0, limit = 10, completed, title }) => {
        const userId = Number(id)
        const arrOffset = Number(offset)
        const arrLimit = Number(limit) + Number(offset)
        let filteredArray = data.filter(task => task.user_id === userId)
        if (!filteredArray.length) {
            return {
                status: 404,
                json: {
                    message: `No tasks were found for user with id ${id}`,
                    status: "fail"
                }
            }
        }
        if (completed) {
            filteredArray = filteredArray.filter(el => el.completed)
        }
        if (title) {
            filteredArray = filteredArray.filter(el => el.title.includes(title))
        }
        filteredArray = filteredArray.slice(arrOffset, arrLimit)

        return {
            status: 200,
            json: {
                total_items: filteredArray.length,
                data: filteredArray
            }
        }
    }
}

module.exports = {
    tasks,
    users
}