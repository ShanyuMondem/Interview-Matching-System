function handleSubmit() {
    const expertFile = document.getElementById('expertFile').files[0];
    const candidateFile = document.getElementById('candidateFile').files[0];
    const interviewerFile = document.getElementById('interviewerFile').files[0];
    const previewSection = document.getElementById('preview-section');

    if (!expertFile || !candidateFile || !interviewerFile) {
        alert("Kindly upload files and click submit.");
        return;
    }

    // Process the CSV files and calculate the scores here
    // For the example, using dummy data
    const data = [
        { SNo: 1, Expert_ID: "E1", Candidate_ID: "C1", Interview_Subject_Job_Role: "Role 1", Matching_Score: "85" },
        { SNo: 2, Expert_ID: "E2", Candidate_ID: "C2", Interview_Subject_Job_Role: "Role 2", Matching_Score: "90" }
    ];

    // Show the preview section after processing
    previewSection.classList.remove('hidden');

    // Generate the table with the data
    generateTable(data);
}

function generateTable(data) {
    const excelPreview = document.getElementById('excel-preview');
    excelPreview.innerHTML = "";

    const table = document.createElement('table');
    table.className = "excel-table";

    const headers = ["SNo", "Expert_ID", "Candidate_ID", "Interview_Subject_Job_Role", "Matching_Score"];
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');

    headers.forEach(header => {
        const th = document.createElement('th');
        th.textContent = header;
        headerRow.appendChild(th);
    });

    thead.appendChild(headerRow);
    table.appendChild(thead);

    const tbody = document.createElement('tbody');

    data.forEach(row => {
        const tr = document.createElement('tr');
        Object.values(row).forEach(cellData => {
            const td = document.createElement('td');
            td.textContent = cellData;
            tr.appendChild(td);
        });
        tbody.appendChild(tr);
    });

    table.appendChild(tbody);
    excelPreview.appendChild(table);

    // Add download button
    const downloadBtn = document.createElement('button');
    downloadBtn.textContent = 'Download CSV';
    downloadBtn.className = 'download-btn';
    downloadBtn.onclick = function() { downloadCSV(data); };
    excelPreview.appendChild(downloadBtn);
}

function downloadCSV(data) {
    // Convert data to CSV format
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "SNo,Expert_ID,Candidate_ID,Interview_Subject_Job_Role,Matching_Score\n";

    data.forEach(row => {
        const rowData = [row.SNo, row.Expert_ID, row.Candidate_ID, row.Interview_Subject_Job_Role, row.Matching_Score].join(",");
        csvContent += rowData + "\n";
    });

    // Create a downloadable link
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "matching_scores.csv");
    document.body.appendChild(link); // Required for Firefox

    // Trigger the download
    link.click();

    // Clean up the link
    document.body.removeChild(link);
}
