<template>
  <el-upload
    class="avatar-uploader"
    action="/bdApi/FaceDetect"
    :show-file-list="false"
    :on-success="handleAvatarSuccess"
    :before-upload="beforeAvatarUpload">
    <img v-if="imageUrl" :src="imageUrl" class="avatar">
    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
  </el-upload>
</template>

<script>
  import qs from 'querystring';
  export default {
    name: "FaceDetect",
    data() {
      return {
        imageUrl: ''
      };
    },
    methods: {
      handleAvatarSuccess(res, file) {
        console.log(file);
        //this.imageUrl = URL.createObjectURL(file.raw);
        let fileReader = new FileReader();
        fileReader.readAsDataURL(file.raw);
        fileReader.onload = () => {
          this.imageUrl = fileReader.result;
          let data={
            image:this.imageUrl.replace(/data:image\/jpeg;base64,/, '')
          } ;
          //console.log(data);

          this.$store.dispatch("getBdToken").then(res => {
           // console.log("token", res.token);
            let url='/bdApiP/face/v2/detect?access_token='+res.token;
            this.axios({
              method: 'POST',
              headers: { 'content-type': 'application/x-www-form-urlencoded' },
              data: qs.stringify(data),
              url,
            }).then(res => {
              console.log(res)
            }).catch(err => {
              console.log(err);
            })
          })
        };

      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;
        // this.imageUrl = URL.createObjectURL(file.raw);
        console.log(file);


        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }
    }
  }
</script>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    /*width: 178px;*/
    /*height: 178px;*/
    max-width: 100%;
    display: block;
  }
</style>
