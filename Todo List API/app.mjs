import http from "http";
import {TodolistService} from "./todolist-service.mjs";

const todolistService = new TodolistService();
const server = http.createServer((req, res) => {
    res.setHeader("Content-Type", "application/json");

    if (req.method === "GET") {
        todolistService.getTodolist(req, res);
    } else if (req.method === "POST") {
        todolistService.createTodo(req, res);
    } else if (req.method === "PUT") {
        todolistService.updateTodo(req, res);
    } else if (req.method === "DELETE") {
        todolistService.deleteTodo(req, res);
    } else {
        res.write(JSON.stringify({
            status: "Method not allowed"
        }));
        res.end();
    }
});

server.listen(3000);