interface ResultStatus {
  id: number;
  name: string;
  desc: string;
}

export const patientResultStatus: ResultStatus[] = [
  {
    id: 1,
    name: '可视化展示',
    desc: '首页设计聚焦于直观地展示关键信息，使用了多种图表形式来总体呈现能耗异常检测的记录和重要指标的消耗量。每个图表都经过精心设计，以确保用户可以轻松识别出消耗趋势和异常模式，从而有效地监控和管理能源使用。',
  },
  {
    id: 2,
    name: '检测功能',
    desc: '异常检测的设计允许用户通过上传一个表格文件来进行能耗数据的导入，这个文件可以包含多条能耗记录，涵盖了如电力、水和燃气等各种资源的消耗信息。一旦上传完成，系统会自动执行智能异常检测流程，这一流程使用先进的算法模型来分析每条记录，识别出可能的异常消耗模式，例如意外的水能源高能耗或低能耗现象。',
  },
  {
    id: 3,
    name: '实时展示',
    desc: '智能异常检测详细结果不仅在用户界面上实时显示，还会被存储在后端数据库中，方便进行历史数据比较和趋势分析，提高了数据处理的透明度和可追踪性，帮助企业或组织优化其能源使用策略和维护能耗监控的持续性。',
  },
];
