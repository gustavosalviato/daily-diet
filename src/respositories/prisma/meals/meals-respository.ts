import { Meal, Prisma } from '@prisma/client'
export interface MealsRepository {
  create(data: Prisma.MealUncheckedCreateInput): Promise<Meal>
  update(data: Prisma.MealUncheckedUpdateInput): Promise<Meal>
  findMealById(mealId: string): Promise<Meal | null>
}