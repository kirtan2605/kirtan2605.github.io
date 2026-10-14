"""Render exact regions of the source PDFs for portfolio case studies.

Install PyMuPDF and run `python scripts/extract-project-figures.py` from any
directory. Coordinates are PDF points, not pixels. The crops preserve the
original diagrams/plots; their explanatory prose lives in the HTML beside them.
"""

from pathlib import Path

import pymupdf


ROOT = Path(__file__).resolve().parents[1]
REPORTS = ROOT / "assets" / "reports"
FIGURES = ROOT / "assets" / "images" / "projects"

# (report, page number, crop in PDF points, output relative to FIGURES)
CROPS = [
    ("MATS-Orbit_presentation.pdf", 6, (307, 80, 940, 515), "mats-orbit/slide-06.png"),
    ("MATS-Orbit_presentation.pdf", 7, (47, 87, 953, 505), "mats-orbit/slide-07.png"),
    ("MATS-Orbit_presentation.pdf", 12, (133, 83, 813, 400), "mats-orbit/slide-12.png"),
    ("MATS-Orbit_presentation.pdf", 27, (53, 83, 907, 507), "mats-orbit/slide-27.png"),
    ("MATS-Orbit_presentation.pdf", 38, (507, 87, 913, 533), "mats-orbit/slide-38.png"),
    ("MATS-Orbit_presentation.pdf", 42, (53, 80, 893, 527), "mats-orbit/slide-42.png"),
    ("AAT_presentation.pdf", 5, (33, 210, 687, 383), "leaky-wave/slide-05.png"),
    ("AAT_presentation.pdf", 7, (90, 163, 647, 385), "leaky-wave/slide-07.png"),
    ("AAT_presentation.pdf", 9, (373, 93, 667, 373), "leaky-wave/slide-09.png"),
    ("AAT_presentation.pdf", 10, (40, 230, 680, 347), "leaky-wave/slide-10.png"),
    ("AAT_presentation.pdf", 11, (57, 103, 390, 373), "leaky-wave/slide-11.png"),
    ("AAT_presentation.pdf", 12, (47, 83, 715, 383), "leaky-wave/slide-12.png"),
    ("AAT_presentation.pdf", 13, (47, 100, 653, 267), "leaky-wave/slide-13.png"),
    ("RFIC_presentation.pdf", 3, (15, 130, 702, 354), "rfic/page-03.png"),
    ("RFIC_presentation.pdf", 11, (140, 90, 530, 352), "rfic/page-11.png"),
    ("RFIC_presentation.pdf", 16, (115, 96, 505, 355), "rfic/page-16.png"),
    ("RFIC_presentation.pdf", 19, (25, 120, 690, 350), "rfic/page-19.png"),
    ("QPSK_project-report.pdf", 6, (67, 254, 545, 451), "qpsk/page-06.png"),
    ("QPSK_project-report.pdf", 7, (67, 66, 545, 188), "qpsk/page-07.png"),
    ("QPSK_project-report.pdf", 7, (67, 487, 545, 608), "qpsk/page-07-constellation.png"),
    ("QPSK_project-report.pdf", 8, (67, 171, 545, 301), "qpsk/page-08.png"),
    ("QPSK_project-report.pdf", 8, (67, 470, 545, 601), "qpsk/page-08-spectrum.png"),
    ("DDM_project-report.pdf", 8, (75, 83, 537, 258), "ddm/page-08.png"),
    ("DDM_project-report.pdf", 14, (75, 83, 537, 258), "ddm/page-14.png"),
    ("DDM_project-report.pdf", 22, (67, 307, 545, 423), "ddm/page-22.png"),
    ("DDM_project-report.pdf", 25, (67, 257, 545, 372), "ddm/page-25.png"),
    ("TSA_project-report.pdf", 10, (68, 184, 586, 386), "tsa/page-10.png"),
    ("TSA_project-report.pdf", 14, (68, 120, 586, 312), "tsa/page-14.png"),
    ("TSA_project-report.pdf", 18, (68, 253, 586, 445), "tsa/page-18.png"),
    ("AIITRA_project-report.pdf", 4, (92, 146, 515, 785), "aiitra/page-04.png"),
    ("AIITRA_project-report.pdf", 15, (45, 193, 551, 455), "aiitra/page-15.png"),
    ("AIITRA_project-report.pdf", 17, (26, 34, 552, 322), "aiitra/page-17.png"),
    ("AIITRA_project-report.pdf", 26, (28, 109, 562, 302), "aiitra/page-26.png"),
    ("AIITRA_project-report.pdf", 26, (82, 316, 501, 562), "aiitra/page-26-epsilon.png"),
    ("AIITRA_project-report.pdf", 27, (65, 220, 530, 452), "aiitra/page-27.png"),
    ("AIITRA_project-report.pdf", 27, (60, 594, 530, 800), "aiitra/page-27-turning.png"),
    ("PIE_project-report.pdf", 5, (57, 121, 545, 222), "pie/page-05.png"),
    ("PIE_project-report.pdf", 10, (53, 91, 563, 476), "pie/page-10.png"),
    ("PIE_project-report.pdf", 21, (69, 107, 534, 422), "pie/page-21.png"),
    ("PIE_project-report.pdf", 21, (69, 455, 534, 768), "pie/page-21-case2.png"),
    ("PIE_project-report.pdf", 22, (70, 82, 535, 447), "pie/page-22.png"),
    ("AOCS_project-report.pdf", 6, (69, 491, 541, 666), "aocs/page-06.png"),
    ("AOCS_project-report.pdf", 14, (69, 310, 541, 668), "aocs/page-14.png"),
    ("AOCS_project-report.pdf", 24, (69, 70, 541, 254), "aocs/page-24-before.png"),
    ("AOCS_project-report.pdf", 24, (69, 422, 541, 608), "aocs/page-24.png"),
    ("AOCS_project-report.pdf", 34, (68, 308, 541, 414), "aocs/page-34.png"),
    ("AOCS_project-report.pdf", 37, (88, 80, 518, 347), "aocs/page-37.png"),
    ("DSA_project-report.pdf", 9, (67, 135, 559, 281), "dsa/page-09.png"),
    ("DSA_project-report.pdf", 23, (66, 175, 538, 533), "dsa/page-23.png"),
    ("DSA_project-report.pdf", 28, (108, 272, 489, 574), "dsa/page-28.png"),
    ("DSA_project-report.pdf", 36, (80, 198, 516, 522), "dsa/page-36.png"),
    ("DSA_project-report.pdf", 41, (67, 296, 534, 580), "dsa/page-41.png"),
    ("DSA_project-report.pdf", 50, (148, 597, 448, 744), "dsa/page-50.png"),
    ("SEDSM_project-report.pdf", 4, (50, 254, 565, 467), "sedsm/page-04.png"),
    ("SEDSM_project-report.pdf", 6, (50, 256, 560, 477), "sedsm/page-06.png"),
    ("SEDSM_project-report.pdf", 8, (61, 523, 535, 718), "sedsm/page-08.png"),
    ("SEDSM_project-report.pdf", 9, (61, 300, 535, 497), "sedsm/page-09.png"),
    ("SEDSM_project-report.pdf", 9, (61, 550, 535, 746), "sedsm/page-09-deep.png"),
    ("SEDSM_project-report.pdf", 12, (197, 84, 400, 426), "sedsm/page-12.png"),
    ("MBSE_poster.pdf", 1, (18, 695, 570, 884), "mbse/poster-requirements.png"),
    ("MBSE_poster.pdf", 1, (611, 77, 1180, 500), "mbse/poster-architecture.png"),
    ("MBSE_poster.pdf", 1, (575, 857, 1183, 1227), "mbse/poster-verification.png"),
    ("EE1103_spline_results.pdf", 1, (25, 12, 1273, 638), "ee1103/spline-01.png"),
    ("EE1103_spline_results.pdf", 5, (25, 12, 1273, 638), "ee1103/spline-05.png"),
    ("EE1103_ODE_results.pdf", 4, (25, 13, 616, 439), "ee1103/ode-04.png"),
    ("EE1103_ODE_results.pdf", 6, (25, 13, 616, 466), "ee1103/ode-06.png"),
    ("EE1103_integration.pdf", 1, (53, 63, 543, 344), "ee1103/integration-01.png"),
    ("EE1103_correlation.pdf", 2, (25, 13, 616, 466), "ee1103/correlation-02.png"),
]


def main():
    open_reports = {}
    for report_name, page_number, bounds, output_name in CROPS:
        source = REPORTS / report_name
        if not source.is_file():
            raise FileNotFoundError(source)
        if report_name not in open_reports:
            open_reports[report_name] = pymupdf.open(source)
        document = open_reports[report_name]
        page = document[page_number - 1]
        clip = pymupdf.Rect(*bounds) & page.rect
        if clip.is_empty or clip != pymupdf.Rect(*bounds):
            raise ValueError(f"Invalid crop: {report_name} page {page_number}: {bounds}")
        destination = FIGURES / output_name
        destination.parent.mkdir(parents=True, exist_ok=True)
        page.get_pixmap(matrix=pymupdf.Matrix(2.2, 2.2), clip=clip, alpha=False).save(destination)
    for document in open_reports.values():
        document.close()
    print(f"Rendered {len(CROPS)} exact source-figure crops")


if __name__ == "__main__":
    main()
