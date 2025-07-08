def one_away(str1: str, str2: str) -> bool:
    index1 = 0
    index2 = 0
    found_difference = False

    if abs(len(str1) - len(str2)) > 1:
        return False
    
    s1 = str1 if len(str1) < len(str2) else str2
    s2 = str2 if len(str1) < len(str2) else str1
    
    while index2 < len(s2) and index1 < len(s1):
        if s1[index1] != s2[index2]:
            if found_difference:
                return False
            
            found_difference = True

            if len(s1) == len(s2):
                index1 += 1
        else:
            index1 += 1
        
        index2 += 1

    return True