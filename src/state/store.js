import axios from 'axios';
import { create } from 'zustand';
/** zustand란? 리액트 애플리케이션 상태 관리용 라이브러리
 * 리액트의 상태를 중앙에서 관리하고, 이 상태를 전역에 쉽게 공유하고 업데이트할 수 있게 하는 라이브러리
 * useContext로 데이터 관리하는 것과 유사
 * 상태를 훅(Hook)처럼 사용해 컴포넌트에서 쉽게 상태 관리 가능
 * 관리하고 싶은 데이터를 한 곳에 모아두고 필요한 문서에서 import해서 사용
 * 서버 사이드 렌더링(SSR)과 호환, 클라이언트-서버 간 상태 동기화 기능을 제공
 */


//axios 인스턴스 생성, 해당 인스턴스를 이용해 HTTP요청을 쉽게 보낼 수 있음.
const instance = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL,   //baseURL: 요청을 날릴 서버 주소, 추후 배포시 주소 변경 필요
    // timeout: 1000,   //timeout: 지정 시간(밀리초) 내에 요청이 완료되지 않으면 취소함.
    // headers: {'X-Custom-Header': 'foobar'}   //headers: 요청에 포함할 기본 헤더
});

// Zustand 스토어(store) 생성
// 스토어는 데이터 종류에 따라 구분해서 여러 개를 사용할 수 있다.
//(ex.회원정보 스토어 - 상품정보 스토어 - 공급자 스토어)

// asset폴더 안에 css, 이미지, 미디어, 폰트 등을 넣음
//lib폴더 안에 라이브러리 보관, zustand도 라이브러리니까 lib폴더 안에 보관
//components폴더 안에는 버튼, 셀렉트박스, 테이블, 타이틀(헤더, 풋터 등)을 보관
//pages폴더 안에는 실제 사용자가 보는 페이지(뷰)를 담음

//store는 데이터 종류 별로 여러 개 생성 가능
const store = create((set) => (
    {
        //<예제코드>
    //   bears: 0,      //현재 상태
    //   increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),    //상태 업데이트(set) 함수. 현재 상태(bears)를 인자로 받아서 bears+1(상태 변경, 업데이트) 함
    //   removeAllBears: () => set({ bears: 0 }),       //bears를 초기상태(0)으로 설정

        //현재 상태
        data : [],  //원본 데이터
        // sortData : [],  //정렬데이터, 선생님코드

        //여기서 set함수의 기능 정의
        dataCtrl : async function(action) {     //async로 비동기를 동기화
            /*
            // axios 사용(기본:비동기)
            // axios.get('http://localhost:4000')
            // .then(
            //     res => {
            //     set({data: res.data})
            // })

            //axios인스턴스 사용(기본:비동기)
            // instance.get('/');
            // .then(res => {
            //     set({data: res.data})
            // })

            //axios인스턴스 사용(동기)
            // let res = await instance.get('/');
            // set({data: res.data.list});
            */

            // 요청 종류에 따라서 set함수의 기능(업데이트)이 다름
            let res;    //axios로 가져와서 저장할 res변수 선언

            switch(action.type){
                case 'GET':
                    res = await instance.get('/');  // / 는 루트url, 여기서는 상단에 정의한 instance의 baseURL.
                    //여기서 res는 동기적으로(await), HTTP GET요청해서 받아온(axios=fetch) response가 된다. 
                    //axios.then이랑 비교해보면
                    //axios.get('주소')  ←이 부분이 우항 instance.get('/')이 되고
                    //.then(res ...  ←이 부분의 res가 좌항의 res.
                    break;
                case 'POST':
                    res = await instance.post('/', action.data); // action.data = {id: 10, name: '추가할 이름'}
                    //res는 POST요청해서 받아온(axios=fetch) response가 된다. 
                    //axios.then이랑 비교해보면
                    //axios.post('주소')  ←이 부분이 우항 instance.post('/')고
                    //.then(res ...  ←이 부분의 res가 좌항의 res.
                    break;
                case 'PUT':
                    res = await instance.put('/', action.data); // action.data = {id: 10, name: '수정할 이름'}
                    //res는 PUT 요청해서 받아온(axios=fetch) response가 된다. 
                    //axios.then이랑 비교해보면
                    //axios.put('주소')  ←이 부분이 우항 instance.put('/')고
                    //.then(res ...  ←이 부분의 res가 좌항의 res.
                    break;
                case 'DELETE':
                    res = await instance.delete(`/?id=${action.data}`);  //data = 삭제할 아이디값
                    break;
            }

            // [질문] : set함수 실행 위치에 대한 의문점
            // set함수를 정의?하는 곳(dataCtrl) 범위 안에서 왜 set함수를 실행시키는거지..? 내가 중괄호 범위를 잘못 잡았나?
            // [A] : 처음에 data는 빈배열로 초기화, action.type에 맞게 http요청해서 데이터를 맞게 (1)번 방법(직접 상태 설정)으로 세팅해줌. = dataCtrl

            set({data: res.data}); // set함수로 상태를 업데이트 시킴       //만약 json에 list외에 다른 배열이 있다면 res.data만 뽑아서 주는게 맞음.
            //ㄴ이걸 axios.then이랑 비교해보면
            //axios.post('주소')  ←이 부분은 위에서 진행함
            //.then(res ...  ←이 부분도 진행함
            // => res.data)  ←이 부분이 res.data 이거고
            //               res.data 여기서 list로 배열만 빼낸게 res.data.list가 됨.
            //               이렇게 빼낸 데이터를 data(위에서 data:1000정의한거)에 직접 넣고 (아래 주석에서 (1)번 방법 사용)
            //               set함수에 들어간 현 상태(state)데이터는 인자값으로 업데이트됨.

                    /** *******<완전중요>Zustand의 set함수******
                     * Zustand에서 애플리케이션 상태 업데이트를 처리하는 핵심 함수
                     * 상태를 업데이트 하는 방법에는 
                     * (1)직접 상태 설정(직접 새로운 상태를 객체로 반환함)  
                     * (2)현재 상태를 기반으로 업데이트(현재 상태에 계산을 해줌)
                     * 두 가지가 있다.
                     * 여기서는 새로운 상태를 직접 설정하는 (1)번 방법을 사용함.
                     * 따라서 변화한 상태를, 객체 형태(오브젝트 형태)로 인자값에 넣어서 보내줌.
                     */

        },


        /**--선생님코드---------------------------------------------------------------------
        //set함수는 목적에 맞게 여러 개 생성 가능
        sortCtrl : function(sort) {
            let findData;
            set((state) => {
                state.data.filter((obj) => obj.status === false)    
                switch(sort){
                    case 'progress' : 
                        findData = state.data.filter((obj) => obj.status === false);    // 체크박스 checked=false
                        break;
                        
                    case 'complete' : 
                        findData = state.data.filter((obj) => obj.status === true);    // 체크박스 checked=true
                        break;

                    default :   //all
                        findData = state.data;
                        break;
                }
            })
            set({data: findData});  //data가 이미 배열 형태이므로 list를 뽑을 필요x
        }
        ---선생님코드-----------------------------------------------------------------------*/

    }
))


export default store;