from flask import Flask, jsonify, request
from flask_cors import CORS

from yf import yf

app = Flask(__name__)
CORS(app)


@app.route("/api", methods=["POST"])
def api():
    data = request.get_json()
    if not data:
        return jsonify({"error": "No data provided"}), 400
    if "stock_codes" not in data:
        return jsonify({"error": "No stock codes provided"}), 400
    stock_codes: list[str] = data["stock_codes"]
    res = []
    market_caps = yf.get_market_cap(stock_codes)
    for code, cap in zip(stock_codes, market_caps):
        res.append({"stock_code": code, "market_cap": cap})
    total_market_cap = sum(market_caps)
    return jsonify({"data": res, "total_market_cap": total_market_cap}), 200


if __name__ == "__main__":
    app.run(debug=True, port=8000, host="0.0.0.0")
