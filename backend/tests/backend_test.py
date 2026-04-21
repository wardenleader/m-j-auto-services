"""
Backend API tests for M & J Auto Services
Endpoints: /api/, /api/shop/status, /api/contact (POST + GET)
"""
import os
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "https://mj-auto-shop.preview.emergentagent.com").rstrip("/")
API = f"{BASE_URL}/api"


@pytest.fixture(scope="module")
def client():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# ---- Root ----
class TestRoot:
    def test_root_welcome(self, client):
        r = client.get(f"{API}/")
        assert r.status_code == 200
        data = r.json()
        assert "message" in data
        assert "M & J Auto Services" in data["message"]


# ---- Shop Status ----
class TestShopStatus:
    def test_shop_status_shape(self, client):
        r = client.get(f"{API}/shop/status")
        assert r.status_code == 200
        data = r.json()
        for key in ("is_open", "day", "hours_today", "local_time"):
            assert key in data
        assert isinstance(data["is_open"], bool)
        assert data["day"] in [
            "Monday", "Tuesday", "Wednesday", "Thursday",
            "Friday", "Saturday", "Sunday"
        ]


# ---- Contact ----
class TestContact:
    def test_create_contact_valid(self, client):
        payload = {
            "name": "TEST_Jane Driver",
            "email": "test_jane@example.com",
            "phone": "(650) 555-0100",
            "vehicle_make": "Toyota",
            "vehicle_model": "Camry",
            "vehicle_year": "2018",
            "service_needed": "Oil Change",
            "message": "TEST_Need an oil change asap",
        }
        r = client.post(f"{API}/contact", json=payload)
        assert r.status_code == 200, r.text
        data = r.json()
        assert data["name"] == payload["name"]
        assert data["email"] == payload["email"]
        assert data["phone"] == payload["phone"]
        assert data["vehicle_make"] == "Toyota"
        assert data["service_needed"] == "Oil Change"
        assert data["message"] == payload["message"]
        assert "id" in data and isinstance(data["id"], str)
        assert "created_at" in data
        assert "_id" not in data

        # Verify persistence via GET
        r2 = client.get(f"{API}/contact")
        assert r2.status_code == 200
        items = r2.json()
        assert isinstance(items, list)
        assert any(it.get("id") == data["id"] for it in items)
        for it in items:
            assert "_id" not in it

    def test_create_contact_minimal_required(self, client):
        payload = {
            "name": "TEST_Minimal",
            "email": "test_min@example.com",
            "phone": "12345",
            "message": "TEST_minimal",
        }
        r = client.post(f"{API}/contact", json=payload)
        assert r.status_code == 200, r.text
        data = r.json()
        assert data["vehicle_make"] is None
        assert data["service_needed"] is None

    def test_create_contact_missing_required(self, client):
        # Missing name, phone, message
        r = client.post(f"{API}/contact", json={"email": "x@y.com"})
        assert r.status_code == 422

    def test_create_contact_invalid_email(self, client):
        payload = {
            "name": "TEST_Bad",
            "email": "not-an-email",
            "phone": "12345",
            "message": "TEST_bad",
        }
        r = client.post(f"{API}/contact", json=payload)
        assert r.status_code == 422

    def test_create_contact_short_phone(self, client):
        payload = {
            "name": "TEST_Shortphone",
            "email": "test_sp@example.com",
            "phone": "123",  # < 5 chars
            "message": "hello",
        }
        r = client.post(f"{API}/contact", json=payload)
        assert r.status_code == 422

    def test_list_contacts_sorted_desc(self, client):
        # Create two back-to-back and verify ordering
        import time
        p1 = {"name": "TEST_A", "email": "test_a@example.com", "phone": "55555", "message": "first"}
        r1 = client.post(f"{API}/contact", json=p1); assert r1.status_code == 200
        time.sleep(0.05)
        p2 = {"name": "TEST_B", "email": "test_b@example.com", "phone": "55555", "message": "second"}
        r2 = client.post(f"{API}/contact", json=p2); assert r2.status_code == 200

        r = client.get(f"{API}/contact")
        assert r.status_code == 200
        items = r.json()
        # Locate positions
        ids = [it["id"] for it in items]
        assert r2.json()["id"] in ids and r1.json()["id"] in ids
        assert ids.index(r2.json()["id"]) < ids.index(r1.json()["id"])
