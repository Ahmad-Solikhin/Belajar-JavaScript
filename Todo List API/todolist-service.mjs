export class TodolistService {

    #todolist = [];

    getTodolist = (req, res) => {

        res.write(this.#generateResponse());
        res.end();
    }

    createTodo(req, res) {
        req.addListener("data", (data) => {
            const body = JSON.parse(data.toString());
            this.#todolist.push(body.todo);

            res.write(this.#generateResponse());
            res.end();
        });
    }

    updateTodo = (req, res) => {
        req.addListener("data", (data) => {
            const body = JSON.parse(data.toString());
            const todo = this.#todolist[body.id];
            if (todo) this.#todolist[body.id] = body.todo;
            res.write(this.#generateResponse());
            res.end();
        });
    }

    deleteTodo = (req, res) => {
        req.addListener("data", (data) => {
            const body = JSON.parse(data.toString());
            const todo = this.#todolist[body.id];
            if (todo) this.#todolist.splice(body.id, 1);

            res.write(this.#generateResponse());
            res.end();
        });
    }

    #generateResponse() {
        return JSON.stringify({
            code: 200,
            status: "Oke",
            data: this.#todolist.map((value, index) => {
                return {
                    id: index,
                    todo: value
                }
            })
        })
    }

}