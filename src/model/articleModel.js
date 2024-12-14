import { model, models, Schema } from "mongoose";

const articleSchema = new Schema(
  {
    title: String,
    description: String,
    image: String,
    date: String,
  },
  { toJSON: { virtuals: true } }
);

articleSchema.virtual("format_date").get(function () {
  return changeDateFormat(this.date);
});

const changeDateFormat = (dateString) => {
  const date = new Date(dateString);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
};

const articleModel = models.article || model("article", articleSchema);

export default articleModel;
