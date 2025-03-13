import mongoose, { Model, Schema } from "mongoose";

interface INutrients {
  foodName: string;
  calories: number;
  protein: number;
  carbohydrate: number;
  fat: number;
  fiber: number;
}

const nutrientsSchema = new Schema<INutrients>({
  foodName: {
    type: String,
    required: true,
  },
  calories: {
    type: Number,
  },
  protein: {
    type: Number,
  },
  carbohydrate: {
    type: Number,
  },
  fat: {
    type: Number,
  },
  fiber: {
    type: Number,
  },
});

const Nutrients: Model<INutrients> = mongoose.model<INutrients>('Nutrients', nutrientsSchema);

export default Nutrients;
