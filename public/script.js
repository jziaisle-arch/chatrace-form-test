const form = document.getElementById("messageForm");
const status = document.getElementById("status");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const message = document.getElementById("message").value;

    status.textContent = "Sending...";

    try {
        const response = await fetch("/send", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ message })
        });

        const data = await response.json();

        if (response.ok) {
            status.style.color = "green";
            status.textContent = "Message sent!";
            form.reset();
        } else {
            status.style.color = "red";
            status.textContent = data.error || "Failed";
        }

    } catch (err) {
        status.style.color = "red";
        status.textContent = err.message;
    }
});
