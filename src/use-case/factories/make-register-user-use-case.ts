import { PrismaUsersRepository } from "@/respositories/prisma/users/prisma-users-repository"
import { PrismaMealsRepository } from "@/respositories/prisma/meals/prisma-meals-repository"
import { CreateMealUseCase } from "../meal/create-meal"

export function makeRegisterUserUseCase() {
  const mealsRespository = new PrismaMealsRepository()
  const usersRepository = new PrismaUsersRepository()
  const createMealUseCase = new CreateMealUseCase(mealsRespository, usersRepository)

  return createMealUseCase
}