document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('bmi-form');
    const resultDiv = document.getElementById('result');
    const bmiValue = document.getElementById('bmi-value');
    const bmiClassification = document.getElementById('bmi-classification');
    const healthyWeightRange = document.getElementById('healthy-weight-range');

    let isMetric = true;

    document.getElementById('metric').addEventListener('click', () => {
        isMetric = true;
        document.getElementById('height').placeholder = 'Height (cm)';
        document.getElementById('weight').placeholder = 'Weight (kg)';
    });

    document.getElementById('imperial').addEventListener('click', () => {
        isMetric = false;
        document.getElementById('height').placeholder = 'Height (in)';
        document.getElementById('weight').placeholder = 'Weight (lbs)';
    });

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        const height = parseFloat(document.getElementById('height').value);
        const weight = parseFloat(document.getElementById('weight').value);
        let bmi;

        if (isMetric) {
            bmi = weight / ((height / 100) ** 2);
        } else {
            bmi = (weight / (height ** 2)) * 703;
        }

        bmiValue.textContent = bmi.toFixed(2);
        bmiClassification.textContent = getClassification(bmi);
        healthyWeightRange.textContent = getHealthyWeightRange(isMetric, height);

        resultDiv.style.display = 'block';
    });

    function getClassification(bmi) {
        if (bmi < 18.5) {
            return 'Underweight';
        } else if (bmi < 24.9) {
            return 'Normal weight';
        } else if (bmi < 29.9) {
            return 'Overweight';
        } else {
            return 'Obese';
        }
    }

    function getHealthyWeightRange(isMetric, height) {
        if (isMetric) {
            const min = 18.5 * ((height / 100) ** 2);
            const max = 24.9 * ((height / 100) ** 2);
            return `Healthy weight range: ${min.toFixed(1)}kg - ${max.toFixed(1)}kg`;
        } else {
            const min = 18.5 * (height ** 2) / 703;
            const max = 24.9 * (height ** 2) / 703;
            return `Healthy weight range: ${min.toFixed(1)}lbs - ${max.toFixed(1)}lbs`;
        }
    }
});
