const fs = require("fs");
const path = require("path");
const Tesseract = require("tesseract.js");
const { OpenAI } = require("openai");
const Receipt = require("../models/receipt");

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

exports.uploadReceipt = async (req, res) => {
  const filePath = req.file.path;

  try {
    const ocrResult = await Tesseract.recognize(filePath, "eng");
    const rawText = ocrResult.data.text;

    const gptResponse = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{
        role: "user",
        content: `Extract structured fields (vendor, date, total, items, category) from this receipt:\n\n${rawText}`
      }],
    });

    const parsed = JSON.parse(gptResponse.choices[0].message.content);
    const newReceipt = new Receipt({ ...parsed, rawText });

    await newReceipt.save();
    fs.unlinkSync(filePath); // Clean up

    res.status(200).json(newReceipt);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to process receipt" });
  }
};

exports.getReceipts = async (req, res) => {
  const receipts = await Receipt.find().sort({ createdAt: -1 });
  res.json(receipts);
};

exports.getReceiptById = async (req, res) => {
  try {
    const receipt = await Receipt.findById(req.params.id);
    res.json(receipt);
  } catch {
    res.status(404).json({ error: "Receipt not found" });
  }
};

exports.deleteReceipt = async (req, res) => {
  try {
    await Receipt.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch {
    res.status(404).json({ error: "Failed to delete" });
  }
};
