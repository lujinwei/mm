export function likeComment(commentId,i,index,commentlist) {
    ```
    commentId：评论id
    i：评论类型（热门评论、最新评论）
    index：评论列表当前的索引
    commentlist：评论内容列表
    ```
    console.log(commentId,i,index,commentlist);
    let cookie = localStorage.getItem("cookie");
    let time = new Date().valueOf();
    // console.log("cid",commentId,"id",this.$route.query.id,i);
    // 给评论点赞
    if(i==1){ //精选评论
        let t = this.AlbumCommentData.hotComments[index].liked == true?0:1; // 当前状态为true是，发送取消点赞，否则发送点赞
        sendCommentLike({
            id: parseInt(this.$route.query.id),
            cid: commentId,
            t: t,
            type: 3,
            cookie:cookie,
            time:time
        }).then((data) => {
            console.log(data);
            if(data.code!=200){
                return;
            }
            if(t==1){ //点赞
                this.$set(this.AlbumCommentData.hotComments[index],"liked",true);
                let likedCount = this.AlbumCommentData.hotComments[index].likedCount+1;
                this.$set(this.AlbumCommentData.hotComments[index],"likedCount",likedCount);
            }else if(t==0){ // 取消点赞
                this.$set(this.AlbumCommentData.hotComments[index],"liked",false);
                let likedCount = this.AlbumCommentData.hotComments[index].likedCount-1;
                this.$set(this.AlbumCommentData.hotComments[index],"likedCount",likedCount);
            }
        });
    }
    if(i==2){
        let t = this.AlbumCommentData.comments[index].liked == true?0:1; // 当前状态为true是，发送取消点赞，否则发送点赞
        sendCommentLike({
            id: parseInt(this.$route.query.id),
            cid: commentId,
            t: t,
            type: 3,
            cookie:cookie,
            time:time
        }).then((data) => {
            console.log(data);
            if(data.code!=200){
                return;
            }
            if(t==1){ //点赞
                this.$set(this.AlbumCommentData.comments[index],"liked",true);
                let likedCount = this.AlbumCommentData.comments[index].likedCount+1;
                this.$set(this.AlbumCommentData.comments[index],"likedCount",likedCount);
            }else if(t==0){ // 取消点赞
                this.$set(this.AlbumCommentData.comments[index],"liked",false);
                let likedCount = this.AlbumCommentData.comments[index].likedCount-1;
                this.$set(this.AlbumCommentData.comments[index],"likedCount",likedCount);
            }
        });
    }
}