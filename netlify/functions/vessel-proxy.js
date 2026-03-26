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

  try {

    const response = await fetch(
      "https://stream.aisstream.io/v0/ships",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": apiKey
        },
        body: JSON.stringify({
          boundingBoxes: [
            [
              [29.0, 27.0],
              [35.5, 33.5]
            ]
          ]
        })
      }
    );

    const text = await response.text();

    if (!text) {
      return {
        statusCode: 200,
        body: JSON.stringify({
          ok: true,
          source: "live",
          vessel_count: 0,
          vessels: []
        })
      };
    }

    const data = JSON.parse(text);

    return {
      statusCode: 200,
      body: JSON.stringify({
        ok: true,
        source: "live",
        vessel_count: Array.isArray(data) ? data.length : 0,
        vessels: data
      })
    };

  }

  catch (error) {

    return {
      statusCode: 500,
      body: JSON.stringify({
        ok: false,
        error: error.message
      })
    };

  }

};
