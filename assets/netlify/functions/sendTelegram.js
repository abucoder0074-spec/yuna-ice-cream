exports.handler = async function(event) {
  const data = JSON.parse(event.body);

  const TOKEN = process.env.;
  const CHAT_ID = process.env.TG_CHAT;

  const message = `
🧊 YUNA Ice Cream — B2B so‘rov

🏢 Kompaniya: ${data.company}
👤 Aloqa shaxsi: ${data.person}
📞 Telefon: ${data.phone}
📍 Hudud: ${data.region}

📝 Izoh:
${data.message}
`;

  await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: CHAT_ID,
      text: message
    })
  });

  return {
    statusCode: 200,
    body: JSON.stringify({ success: true })
  };
};
