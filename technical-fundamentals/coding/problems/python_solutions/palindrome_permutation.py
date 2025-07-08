def palindrome_permutation(s: str) -> bool:
    normalized:str = ""
    for char in s:
        if char.isalnum():
            normalized += char.lower()
    
    char_counts = {}
    for char in normalized:
        if char in char_counts:
            char_counts[char] += 1
        else:
            char_counts[char] = 1
    
    odd_counts = 0
    for char in char_counts:
        if char_counts[char] % 2 != 0:
            odd_counts += 1
            if odd_counts > 1:
                return False 
    return True