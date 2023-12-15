from flask import Flask, jsonify, request

app = Flask(__name__)


@app.route("/api", methods=["POST"])
def api():
    data = request.get_json()
    print(data)
    return jsonify(data)


if __name__ == "__main__":
    app.run(debug=True, port=8000, host="0.0.0.0")
