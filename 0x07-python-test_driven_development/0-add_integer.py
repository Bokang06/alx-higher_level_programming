#!/usr/bin/python3


def add_integer(a, b=98):
    try:
        return int(a) + int(b)
    except (ValueError, TypeError):
        raise TypeError("Both arguments must be integers or floats")

result = add_integer(5, 3.5)
print(result)  # Output: 8

result = add_integer(4, "string")
# Raises a TypeError with the message: "Both arguments must be integers or floats"
