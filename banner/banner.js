import React,{Component} from 'react';
import Title from '../title/title';
require('./banner.css');

function targetMove(target, move) {
    // target.style.left=move+'px';
    target.style.transform =`translate(${move}px,0px,0px)`;
    target.style.webkitTransform =`translate3d(${move}px,0px,0px)`;
}
function targetMoveLeft (target, move){
    target.style.left=move+'px';
}
export default class Banner extends Component{
    componentWillMount(){
        this.clientWidth=document.documentElement.clientWidth;

    }
    getBannerIndex(index){
        if(this.index<0){
            return Math.abs(index%this.length);
        }else{
            var index=index%this.length;
            return Math.abs((this.length-index)%this.length);
        }
    }
    imgToCanter(index){
        let left=Math.floor((this.length-1)/2);
        let right=Math.ceil((this.length-1)/2);
        let bannerIndex=this.getBannerIndex(index);
        targetMoveLeft(this.refs[`banner${bannerIndex}`],-this.clientWidth*index);
        for(let i=1;i<=left;i++){
            let left=bannerIndex-i<0?this.length+bannerIndex-i:bannerIndex-i;
            targetMoveLeft(this.refs[`banner${left}`],-this.clientWidth*index-this.clientWidth*i)
        }
        for(let i=1;i<=right;i++){
            let right=bannerIndex+i>=this.length?i+bannerIndex-this.length:bannerIndex+i;
            targetMoveLeft(this.refs[`banner${right}`],-this.clientWidth*index+this.clientWidth*i);
        }
    }
    componentDidMount(){
        var height = this.clientWidth*350/640;
        var banner = this.refs.banner;
        this.bannerBox=this.refs.bannerBox;
        banner.style.height=height+'px';
        this.bannerBox.style.height=height+'px';
        if(this.props.imgList.length){
            this.changeActive(0);
            this.refs[`banner${0}`].style.zIndex=11;
        }
        this.index=0;
        this.imgToCanter(0,0)
        if( this.props.imgList.length>1) this.autoMoveRun();
    }
    autoMove(index){
        //var index=parseInt(index);
        //console.log(index);
        //var target=this.refs[`banner${index}`];
        //var afterIndex=index+1>=this.length?0:index+1;
        //var after=this.refs[`banner${afterIndex}`];
        //target.classList.remove('banner-move');
        //after.classList.remove('banner-move');
        //target.style.zIndex=11;
        //after.style.zIndex=11;
        //targetMove(target,0);
        //targetMove(after,this.clientWidth);
        //setTimeout(function(){
        //    target.classList.add('banner-move');
        //    after.classList.add('banner-move');
        //    targetMove(target,-this.clientWidth);
        //    targetMove(after,0);
        //}.bind(this),100)
        this.bannerBox.classList.add('banner-move');
        this.imgToCanter(index);
        targetMove(this.bannerBox,this.clientWidth*index);
    }
    autoMoveRun(){
         this.timer=setInterval(()=>{
             this.index--;
             let bannerIndex=this.getBannerIndex(this.index);
             this.autoMove(this.index);
             this.changeActive(bannerIndex);
        },3000 )
    }
    changeActive(index){
        var pointers=this.refs.pointers.getElementsByTagName('span');
        [...pointers].forEach(data=>data.classList.remove('p-color'));
        pointers[index].classList.add('p-color');
    }
    touchStart(event){
        this.clientX=event.changedTouches[0].clientX
        this.bannerBox.classList.remove('banner-move')
        event.preventDefault();
        clearInterval(this.timer);
    }
    touchMove(event){
        var moveX=event.changedTouches[0].clientX-this.clientX;
        this.canMove=Math.abs(moveX)>=30?true:false;
        targetMove( this.bannerBox,this.clientWidth*this.index+moveX);
        this.moveRight=moveX>0?false:true;
        event.preventDefault();
    }
    touchEnd(event){
        this.bannerBox.classList.add('banner-move')
        if(!this.canMove){
            targetMove(this.bannerBox,this.clientWidth*this.index);
            return false;
        }
        if(this.moveRight){
            this.index--
        }else{
            this.index++;
        }
        targetMove(this.bannerBox,this.clientWidth*this.index);
        this.autoMoveRun(this.index);
        let bannerIndex=this.getBannerIndex(this.index);
        this.changeActive(bannerIndex);
        setTimeout(()=>{
            this.bannerBox.classList.remove('banner-move')
            this.imgToCanter(this.index);
        },300)
        event.preventDefault();
    }
    render(){

        this.imgDatas = this.props.imgList?this.props.imgList:[];
        this.length=this.imgDatas.length;
        var icons=[];
        var imgs=[];
        for(var i=0;i<this.length;i++){
            icons.push(<span className='pointer' key={i}></span>);
            imgs.push(<img ref={`banner${i}`} key={i} data-index={i}  className='banner-img' src={this.imgDatas[i]}/>);
        }
        return (
            <div className='banner-warp'>
                <Title>{this.props.title}</Title>
                <div  className='banner' ref="banner">
                    <div ref="bannerBox" onTouchEnd={this.touchEnd.bind(this)} onTouchMove={this.touchMove.bind(this)} onTouchStart={this.touchStart.bind(this)}>
                       {imgs}
                    </div>
                    <p className='banner-pointer' ref="pointers">
                        {icons}
                    </p>
                </div>
            </div>
        )
    }
}

