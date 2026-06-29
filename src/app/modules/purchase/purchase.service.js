import Purchase from "./purchase.model.js";
import Ebook from "../ebook/ebook.model.js";
import AppError from "../../utils/AppError.js";
import stripe from "../../utils/stripe.js";


const createPurchase = async (userId, ebookId) => {
  const ebook = await Ebook.findById(ebookId);

  if (!ebook) {
    throw new AppError(404, "Ebook not found");
  }

  if (ebook.author.toString() === userId.toString()) {
    throw new AppError(
      403,
      "You cannot purchase your own ebook"
    );
  }

  const alreadyPurchased = await Purchase.findOne({
    buyer: userId,
    ebook: ebookId,
    paymentStatus: "paid",
  });

  if (alreadyPurchased) {
    throw new AppError(
      409,
      "You already purchased this ebook"
    );
  }

  const purchase = await Purchase.create({
    buyer: userId,
    ebook: ebook._id,
    writer: ebook.author,
    price: ebook.price,
    paymentStatus: "pending",
  });

  return purchase;
};


const checkout = async (userId, ebookId) => {

  const purchase = await createPurchase(
    userId,
    ebookId
  );

  const session = await createCheckoutSession(
    purchase
  );

  purchase.transactionId = session.id;

  await purchase.save();

  return session.url;

};


const createCheckoutSession = async (purchase) => {

  const session = await stripe.checkout.sessions.create({

    payment_method_types: ["card"],

    mode: "payment",

    line_items: [

      {

        price_data: {

          currency: "usd",

          product_data: {

            name: "Ebook Purchase",

          },

          unit_amount: purchase.price * 100,

        },

        quantity: 1,

      },

    ],

    success_url: `${process.env.CLIENT_URL}/payment/success`,

    cancel_url: `${process.env.CLIENT_URL}/payment/cancel`,

  });

  return session;

};


const getAllPurchases = async () => {
  return await Purchase.find()
    .populate("buyer", "name email")
    .populate("ebook", "title")
    .populate("writer", "name")
    .sort("-createdAt");
};


export const PurchaseService = {
  createPurchase,
  createCheckoutSession,
    checkout,
    getAllPurchases,

    
};