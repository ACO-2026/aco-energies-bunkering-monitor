exports.handler = async function () {
  const apiKey = process.env.AISSTREAM_API_KEY;

  if (!apiKey) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        ok: false,
        error: "Missing AISSTREAM_API_KEY"
      })
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      ok: true,
      source: "live",
      message: "AISSTREAM_API_KEY detected"
    })
  };
};
