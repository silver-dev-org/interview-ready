def is_unique_chars(s:str) -> bool:
    non_repeat_char = set()
    for char in s:
        if char in non_repeat_char:
            return False
        else:
            non_repeat_char.add(char)
    return True
