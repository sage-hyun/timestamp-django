import io

def eng_kor_seperation(lyric):

    buf = io.StringIO(lyric)

    eng = []
    kor = []

    while True:
        line = buf.readline()

        if not line: break
        
        if ord('가') <= ord(line[0]) <= ord('힣'):
            kor.append(line.strip())                # strip(): 좌우 양끝 whitespace 있으면 제거
        elif ord('a') <= ord(line[0].lower()) <= ord('z'): 
            eng.append(line.strip())
        elif line[0] == '[':
            None
        # 원래 line[0]으로 했는데 'Cause가 많아서 두번째로 또확인...
        elif len(line) > 1:
            if ord('a') <= ord(line[1].lower()) <= ord('z'): 
                eng.append(line.strip())
            # 공백
            else:
                eng.append(" ")
                kor.append(" ")

    return eng, kor