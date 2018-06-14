<template>
  <div>


    <el-upload
      class="avatar-uploader"
      action="/bdApi/FaceDetect"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload">
      <img v-if="imageUrl" :src="imageUrl" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>

    </el-upload>


    <el-row v-loading="loading">
      <el-col :span="12">
        <div class="grid-content bg-purple-dark">
          <span class="lable-left">人脸数目：</span> {{result.result_num}}
        </div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content bg-purple-dark">
          <span class="lable-left">日志id：</span> {{result.log_id}}
        </div>
      </el-col>
      <template v-if="result.result_num">
        <el-table
          :data="result.result"
          style="width: 100%">
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="人脸置信度">
                  <span>{{ props.row.face_probability }}</span>
                </el-form-item>
                <el-form-item label="年龄">
                  <span>{{ props.row.age }}</span>
                </el-form-item>
                <el-form-item label="美丑">
                  <span>{{ props.row.beauty }}</span>
                </el-form-item>
                <el-form-item label="表情">
                  <span>{{ props.row.expression }}</span>
                </el-form-item>
                <el-form-item label="表情可信度">
                  <span>{{ props.row.expression_probablity }}</span>
                </el-form-item>
                <el-form-item label="左边界的距离">
                  <span>{{ props.row.location.left }}</span>
                </el-form-item>
                <el-form-item label="上边界的距离">
                  <span>{{ props.row.location.top }}</span>
                </el-form-item>
                <el-form-item label="宽度">
                  <span>{{ props.row.location.width }}</span>
                </el-form-item>
                <el-form-item label="高度">
                  <span>{{ props.row.location.height }}</span>
                </el-form-item>
                <el-form-item label="性别">
                  <span>{{ props.row.gender }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column
            label="年龄"
            prop="age">
          </el-table-column>
          <el-table-column
            label="beauty，美丑打分"
            prop="beauty">
          </el-table-column>
          <el-table-column
            label="face_probability，人脸置信度"
            prop="face_probability">
          </el-table-column>
        </el-table>
      </template>
    </el-row>
    <p v-if="result">
      {{result}}
    </p>
  </div>
</template>

<script>
  import qs from 'querystring';

  export default {
    name: "FaceDetect",
    data() {
      return {
        imageUrl: '',
        result: {
          result_num: '',
          result: [],
          log_id: ''
        },
        loading: false,
        tableData5: [{
          id: '12987122',
          name: '好滋好味鸡蛋仔',
          category: '江浙小吃、小吃零食',
          desc: '荷兰优质淡奶，奶香浓而不腻',
          address: '上海市普陀区真北路',
          shop: '王小虎夫妻店',
          shopId: '10333'
        }]
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
          let data = {
            image: this.imageUrl.replace(/data:image\/jpeg;base64,/, ''),
            face_fields:"age,beauty,expression,faceshape,gender,glasses,race,qualities",
            max_face_num:10
          };
          //console.log(data);
          this.loading = true;
          this.$store.dispatch("getBdToken").then(res => {
            // console.log("token", res.token);
            let url = '/bdApiP/face/v2/detect?access_token=' + res.token;
            this.axios({
              method: 'POST',
              headers: {'content-type': 'application/x-www-form-urlencoded'},
              data: qs.stringify(data),
              url,
            }).then(res => {
              //console.log(res);
              this.result = res.data;
              this.loading = false;
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
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 120px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>
