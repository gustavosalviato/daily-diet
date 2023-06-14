import { FastifyInstance } from "fastify";
import { register } from "../controllers/resgister-user-controller";
import { createMeal } from "../controllers/create-meal.controller";
import { updateMeal } from "../controllers/update-meal-controller";
import { deleteMeal } from "../controllers/delete-meal-controller";
import { listMealsByUser } from "../controllers/list-meals-by-user-controller";

export async function AppRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/meals', createMeal)
  app.put('/meals/:id', updateMeal)
  app.delete('/meals/:id', deleteMeal)
  app.get('/meals/:id', listMealsByUser)
}