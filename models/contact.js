const { Schema, model } = require('mongoose');

// const contactSchema = Schema(
//   {
//     name: {
//       type: String,
//       required: [true, "Set name for contact"],
//     },
//     phone: {
//       type: String,
//     },
//     email: {
//       type: String,
//     },
//     favorite: {
//       type: Boolean,
//       default: false,
//     },
//     owner: {
//       type: Schema.Types.ObjectId,
//       ref: "user",
//       required: true,
//     },
//   },
//   {
//     versionKey: false,
//     timestamps: true,
//   }
// );

// const Contact = model("contact", contactSchema);

const contactSchema = Schema(
  {
    date: {
      type: String,
      required: [true, 'Set date for todo'],
    },
    descr: {
      type: String,
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'low',
    },
    theme: {
      type: String,
      enum: ['green', 'red', 'orange'],
      default: 'green',
    },
    isDone: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

const Contact = model('item', contactSchema);

module.exports = Contact;
