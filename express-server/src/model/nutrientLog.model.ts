import mongoose, { Schema, Document, Model } from "mongoose";

interface INutrients {
  protein: number;
  carbs: number;
  fats: number;
  calories: number;
}

interface IDailyEntry {
  date: Date;
  nutrients: INutrients;
}

export interface INutrientLog extends Document {
  userId: string;
  dailyEntries: IDailyEntry[];
}

const nutrientsSchema = new Schema<INutrients>(
  {
    protein: { type: Number, default: 0 },
    carbs: { type: Number, default: 0 },
    fats: { type: Number, default: 0 },
    calories: { type: Number, default: 0 },
  },
  {
    _id: false,
  }
);

const dailyEntrySchema = new Schema<IDailyEntry>(
  {
    date: { type: Date, required: true },
    nutrients: nutrientsSchema, // Use the separate nutrientsSchema
  },
  {
    _id: false,
  }
);

const nutrientLogSchema = new Schema<INutrientLog>({
  userId: { type: String, required: true, unique: true },
  dailyEntries: [dailyEntrySchema],
});

const NutrientLog: Model<INutrientLog> = mongoose.model<INutrientLog>(
  "NutrientLog",
  nutrientLogSchema
);

export default NutrientLog;
