require('regenerator-runtime/runtime')
require("@testing-library/jest-dom");
const Services = require('../../Api/serverServices')
const MockedValues = require('./mockedValues.json')

describe('Server Services', () => {
  it("Tasks - With offset should return from offset + 1 value to limit (default 10)", async () => {
    let {data} = Services.tasks.get({ offset: 5, data: MockedValues.tasks })

    expect(data.length).toEqual(10)
    expect(data[0]).toMatchObject(MockedValues.tasks[5])
  })

  it("Tasks - Without offset should return from the beggining to limit (default 10)", async () => {
    let {data} = Services.tasks.get({ data: MockedValues.tasks })

    expect(data.length).toEqual(10)
    expect(data[0]).toMatchObject(MockedValues.tasks[0])
    expect(data[data.length-1]).toMatchObject(MockedValues.tasks[9])
  })

  it("Tasks - With limit should return the limit amount of values", async () => {
    let {data} = Services.tasks.get({limit:5, data: MockedValues.tasks })

    expect(data.length).toEqual(5)
    expect(data[0]).toMatchObject(MockedValues.tasks[0])
    expect(data[data.length-1]).toMatchObject(MockedValues.tasks[4])
  })

  it("Tasks - With title should return the values that contains that string", async () => {
    let {data} = Services.tasks.get({title:"et porro tempora", data: MockedValues.tasks })

    expect(data.length).toEqual(1)
    expect(data[0]).toMatchObject(MockedValues.tasks[3])
  })

  it("Tasks - With complete should return the values that are completed", async () => {
    let {data} = Services.tasks.get({completed: true, data: MockedValues.tasks })

    expect(data.length).toEqual(7)
    expect(data[4].completed).toBeTruthy()
  })

  it("Tasks - With user id should return the tasks assigned to that user", async () => {
    let {data} = Services.tasks.get({userId: "3", data: MockedValues.tasks })

    expect(data.length).toEqual(2)
    expect(data[data.length-1].user_id).toBe(3)
  })

  it("Tasks GetById - Should return the task with the same id", async () => {
    let data = Services.tasks.getById({id: "11", data: MockedValues.tasks })

    expect(data).toMatchObject(MockedValues.tasks[10])
  })

  it("Users Get All - Should return all users", async () => {
    let {data} = Services.users.get({data: MockedValues.users })

    expect(data.length).toBe(MockedValues.users.length)
  })

  it("Users GetById - Should return the user with the id", async () => {
    let data = Services.users.getById({id: 5,data: MockedValues.users })

    expect(data).toBe(MockedValues.users[4])
  })

  it("Users GetTasksFromUser - Should return the user's tasks", async () => {
    let {data} = Services.users.getTasksFromUser({id: 3,data: MockedValues.tasks })
    expect(data.length).toBe(2)
  })

  it("Users GetTasksFromUser - Having complete params should return the tasks that are completed", async () => {
    let {data} = Services.users.getTasksFromUser({id: 1, completed: true,data: MockedValues.tasks })
    expect(data.length).toBe(5)
  })

  it("Users GetTasksFromUser - Having title params should return the tasks that contains that string", async () => {
    let {data} = Services.users.getTasksFromUser({id: 1, title: "molestiae perspiciatis ipsa",data: MockedValues.tasks })
    expect(data.length).toBe(1)
  })
})