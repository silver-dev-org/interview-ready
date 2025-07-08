def urlify(s:str) -> str:
    res = ""
    for i in range(len(s)):
        if s[i] == " ":
            res += "%20"
        else:
            res += s[i]
    return res
