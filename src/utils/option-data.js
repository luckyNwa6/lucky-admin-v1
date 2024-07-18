const optionData = {
  // 失控动作
  outofControlActionList: [
    {
      label: '退出航线并返航',
      value: 0
    },
    {
      label: '继续执行航线任务',
      value: 1
    },
    {
      label: '降落',
      value: 2
    }
  ],
  loadOptions: [
    {
      label: '喊话器',
      value: 1
    },
  ],
  weekOptions: [
    {
      label: '周一',
      value: '周一',
    },
    {
      label: '周二',
      value: '周二',
    },
    {
      label: '周三',
      value: '周三',
    },
    {
      label: '周四',
      value: '周四',
    },
    {
      label: '周五',
      value: '周五',
    },
    {
      label: '周六',
      value: '周六',
    },
    {
      label: '周日',
      value: '周日',
    },
  ],
  timeOptions: [
    {
      label: '天',
      value: 1
    },
    {
      label: '周',
      value: 2
    },
  ],

  jobOptions: [
    {
      label: '普通任务',
      value: 0
    },
    {
      label: '接处警任务',
      value: 1
    },
  ],

  alarmOptions: [
    { label: '全部', value: 0 },
    { label: '近3天', value: 1 },
    { label: '近7天', value: 2 },
    { label: '近1个月', value: 3 },
  ],
  airStatusList: [
    { label: '开启', value: 0 },
    { label: '暂停', value: 1 },
    { label: '结束', value: 2 },
  ],
  statusList: [
    { label: '待执行', value: 1 },
    { label: '执行中', value: 2 },
    { label: '完成', value: 3 },
    { label: '取消', value: 4 },
    { label: '失败', value: 5 },
    { label: '暂停', value: 6 }
  ],
  jjStatusList: [
    { label: '未执行', value: 1 },
    { label: '执行中', value: 2 },
    { label: '执行成功', value: 3 },
    { label: '取消执行', value: 4 },
    { label: '执行失败', value: 5 }
  ],

  clarityList: [
    //直播清晰度
    {
      value: 0,
      label: 'Adaptive'
    },
    {
      value: 1,
      label: 'Smooth'
    },
    {
      value: 2,
      label: 'Standard'
    },
    {
      value: 3,
      label: 'HD'
    },
    {
      value: 4,
      label: 'Super Clear'
    }
  ],
  mediaTypeOption: [
    //媒体类型
    {
      value: 1,
      label: '照片'
    },
    {
      value: 2,
      label: '视频'
    }
  ],
  modelTypeOption: [
    //模型类型
    {
      value: 'QX',
      label: '倾斜模型'
    },
    {
      value: '2D',
      label: '二维地图'
    },
    {
      value: 'DY',
      label: '点云'
    },
    {
      value: 'QJ',
      label: '全景照片'
    }
  ],
  switchVideoTypes: [
    //无人机摄像头镜头
    {
      value: 'zoom',
      label: '变焦'
    },
    {
      value: 'wide',
      label: '广角'
    }, {
      value: 'ir',
      label: '红外'
    }
  ],
  hmsLevelOption: [
    //告警等级
    {
      value: 0,
      label: '通知'
    },
    {
      value: 1,
      label: '注意'
    },
    {
      value: 2,
      label: '警告'
    }
  ],
  //保单状态
  orderStatusOption: [
    {
      value: 0,
      label: '正常'
    },
    {
      value: 1,
      label: '即将逾期'
    },
    {
      value: 2,
      label: '已过期'
    }
  ],
  //电池健康状态
  batteryStatusOption: [
    {
      value: 0,
      label: '故障'
    },
    {
      value: 1,
      label: '健康'
    },
  ],
  //组织状态
  deptStatusOption: [
    {
      value: 0,
      label: '正常'
    },
    {
      value: 1,
      label: '停用'
    },
  ],
  //无人机驾驶证类型
  driveTypeOption: [
    {
      value: 'AOPA',
      label: 'AOPA',
      disabled: false
    },
    {
      value: 'UTC',
      label: 'UTC',
      disabled: false
    },
    {
      value: 'ASFC',
      label: 'ASFC',
      disabled: false
    },
    {
      value: 'CAAC',
      label: 'CAAC',
      disabled: false
    },
  ],
};

export default optionData;
