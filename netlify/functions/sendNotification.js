// netlify/functions/sendNotification.js

const ONESIGNAL_APP_ID = "de2f7155-bcb3-4406-bce7-6a2d5f4e197b";
const ONESIGNAL_REST_KEY = "os_v2_app_3yxxcvn4wncanphhniwv6tqzpmjhadd55dxes6fry32cccdhdbxqidv3cuxf5pdclip3wf76lrgqddvz767o5lkn5662m2glgxhg6fi";

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const { title, message, imageUrl } = JSON.parse(event.body);

  const payload = {
    app_id: ONESIGNAL_APP_ID,
    included_segments: ["All"],
    headings: { en: title },
    contents: { en: message },
    chrome_web_image: imageUrl || undefined,
  };

  const response = await fetch("https://onesignal.com/api/v1/notifications", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${ONESIGNAL_REST_KEY}`,
    },
    body: JSON.stringify(payload),
  });

  const result = await response.json();

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
    },
    body: JSON.stringify(result),
  };
};
