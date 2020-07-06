def test_get_recipes_should_return_recipes(client):

    # TODO: create factory data

    response = client.get("/recipes/")

    assert response.status_code == 200
    assert response.json == {"recipe": "list"}
