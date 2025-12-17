def string_compression(str1: str) -> str:
    if not str1:
        return ""
    
    count = 1
    res_compress = ""

    for i in range(1, len(str1)):
        if str1[i] == str1[i -1]:
            count += 1
        else:
            res_compress += str1[i-1] + str(count)
            count = 1 
    
    res_compress += str1[-1] + str(count)
    
    return res_compress if len(res_compress) < len(str1) else str1