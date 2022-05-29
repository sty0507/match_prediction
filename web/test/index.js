function checkpw(){
    var id = $('#id').val();
    var pw = $('#pw').val();
    var name = $('#name').val();
    var pw_a = $('#pw_a').val();

    if(id.length < 4 || id.length >= 20) alert("id가 양식에 적합하지 않습니다.");
    else if(pw.length<4 || pw_a <4) alert("비밀번호는 4자 이상 입력해주세요");
    else if(pw !== pw_a) alert("비밀번호가 일치하지 않습니다.");
    else {
        $.ajax({
            url: '/',
            type:'POST',
            date : {
                pw : pw,
                id : id,
                email : email
            },
            succes : function(data) {
                if (data === "중복Id"){
                    alert("이미 존재하는 ID입니다.")
                }
                else if(data === "성공"){
                    alert("정상적으로 회원가입 되었습니다.")
                }
            }
        })
    }
}