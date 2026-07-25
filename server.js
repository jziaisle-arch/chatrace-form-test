require("dotenv").config();

const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static("public"));

app.post("/send", async (req, res) => {
    try {
        const { message } = req.body;

        const response = await fetch(
            "https://api.chatrace.com/contacts/8978240100/send_content",
            {
                method: "POST",
                headers: {
                    "accept": "application/json",
                    "Content-Type": "application/json",
                    "X-ACCESS-TOKEN": process.env.CHATRACE_TOKEN
                },
                body: JSON.stringify({
                    messages: [
                        {
                            message: {
                                text: message
                            }
                        }
                    ],
                    actions: [],
                    channel: "telegram"
                })
            }
        );

        const data = await response.json();

        res.status(response.status).json(data);

    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: err.message
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
