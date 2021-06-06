export const historyOptions = {
    lineHeightAnnotation:{
        always:true,
        hover:false,
        lineWeight:1.5
    },
    animations: {
        duration:2000
    },
    maintainAspectRatio:false,
    responsive:true,
    scales:{
        xAxes:[{
            type:"time",
            distribution: "linear"
        }]
    }
};