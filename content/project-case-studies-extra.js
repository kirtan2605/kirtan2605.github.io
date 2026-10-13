// Details below are grounded in the linked primary reports, handout, poster,
// assignment PDFs, and repository code. Keep simulation and concept results
// distinct from measured or operational performance.
export const additionalCaseStudies = {
    aocs: {
        area: "Spacecraft guidance · Attitude control",
        lead: "A geosynchronous spacecraft does not always sit over one perfect point on Earth. This study traced orbital deviations into ground-station pointing commands, then examined whether a bias-momentum spacecraft could follow them using roll sensing and pulsed offset thrusters.",
        tags: ["Geosynchronous orbit", "Pointing guidance", "Roll–yaw coupling", "PWPF modulation"],
        metrics: [
            { value: "3", label: "orbital deviation mechanisms analyzed" },
            { value: "0.02°", label: "modeled roll-sensor quantization" },
            { value: "0.05 s", label: "modeled minimum thruster on-time" },
        ],
        sections: [
            {
                id: "orbit", kicker: "01 · Why pointing drifts", title: "From orbit errors to a moving sub-satellite point",
                paragraphs: [
                    "The study starts with the sub-satellite point (SSP), the place directly beneath the spacecraft. Inclination produces north–south motion and a smaller longitude variation; eccentricity makes the SSP move east–west; a semi-major-axis or orbital-period error creates cumulative longitudinal drift. Their combinations form the familiar figure-eight ground trace.",
                    "The report derives the small-deviation relationships and simulates several combinations, rather than treating a geosynchronous spacecraft as motionless over Earth. These trajectories are the inputs to the later pointing problem.",
                ],
                figures: [{ image: "assets/images/projects/aocs/page-06.png", alt: "Figure-eight ground trace produced by combined geosynchronous orbital deviations", label: "SSP trace · report p. 6", caption: "Combined inclination and eccentricity create a moving, figure-eight sub-satellite trace." }],
            },
            {
                id: "guidance", kicker: "02 · Point at the target", title: "Convert SSP position into an attitude command",
                paragraphs: [
                    "The geometry then connects the spacecraft, Earth's center, the SSP, and a chosen ground station. Using the station's coordinates and the simulated SSP, the report derives viewing angles and a 3-2-1 attitude sequence for the desired pointing direction.",
                    "Guidance plots are shown for the ISTRAC station near Lucknow using several example satellite orbits. For the low-inclination cases examined, the report finds pitch commands much smaller than roll and yaw commands, which motivates concentrating the active loop on roll.",
                ],
                figures: [{ image: "assets/images/projects/aocs/page-14.png", alt: "Pointing command plots for four example geosynchronous spacecraft toward the Lucknow ground station", label: "Report page 14", caption: "The same ground target requires different commands when the spacecraft's orbit changes." }],
            },
            {
                id: "control", kicker: "03 · Design the control loop", title: "Use momentum bias to couple roll and yaw",
                paragraphs: [
                    "A momentum wheel stabilizes the spacecraft but also couples its roll and yaw motion. The report models those coupled equations, identifies precession and nutation responses, and studies a roll-error controller through root-locus analysis.",
                    "A proportional controller alone does not damp both modes in the model. Adding a left-half-plane controller zero leads to a proportional–derivative roll law that damps the orbital and nutation responses. The offset thruster geometry simultaneously applies roll and yaw torques.",
                ],
                figures: [
                    { image: "assets/images/projects/aocs/page-24-before.png", alt: "Root-locus result for a controller zero in the right half-plane", label: "Right-half-plane zero · report p. 24", caption: "The initial zero placement does not provide the desired damping for both modes." },
                    { image: "assets/images/projects/aocs/page-24.png", alt: "Root-locus result for a controller zero in the left half-plane", label: "Left-half-plane zero · report p. 24", caption: "Moving the zero to the left half-plane changes the closed-loop pole paths." },
                ],
            },
            {
                id: "implementation", kicker: "04 · Model real interfaces", title: "Sensor samples and thruster pulses change the problem",
                paragraphs: [
                    "The final simulation adds an Earth sensor with sample-and-hold output, modeled noise and 0.02° quantization. A pulse-width pulse-frequency modulator translates the continuous control demand into on/off thruster commands with a minimum 0.05-second firing time.",
                    "The report first reproduces a published idealized roll–yaw response as a verification step, then adds these nonideal sensor and actuation elements. It documents the selected parameters and modeling limits; it does not show flight hardware or a measured in-orbit pointing error.",
                ],
                figures: [
                    { image: "assets/images/projects/aocs/page-34.png", alt: "Pulse-width pulse-frequency modulator and thruster pulse response diagrams", label: "Report page 34", caption: "Continuous torque commands have to become discrete, one-directional reaction-jet pulses." },
                    { image: "assets/images/projects/aocs/page-37.png", alt: "Comparison between a published roll-yaw response and the reproduced Simulink model", label: "Report page 37", caption: "A model-to-reference comparison precedes the more realistic sensor and actuation simulation." },
                ],
            },
        ],
        resources: [{ label: "Read full report", url: "assets/reports/AOCS_project-report.pdf" }],
    },
    dsa: {
        area: "Aircraft design · Supersonic transport",
        lead: "This conceptual aircraft design began with a London–New York mission, then carried the implications through fuel and weight estimation, thrust/wing-loading constraints, wing and fuselage geometry, and engine sizing. The report makes the trade-offs visible as one linked design, not isolated aircraft parts.",
        tags: ["Mach 2.25 concept", "Mission sizing", "Constraint diagram", "Wing design", "Engine sizing"],
        metrics: [
            { value: "Mach 2.25", label: "target cruise speed" },
            { value: "251 t", label: "estimated maximum take-off mass" },
            { value: "548.5 m²", label: "derived wing-area target" },
        ],
        sections: [
            {
                id: "mission", kicker: "01 · Design brief", title: "Start with the route and its operational constraints",
                paragraphs: [
                    "The group set a London Heathrow–New York JFK transatlantic mission with a Mach 2.25 cruise at 60,000 ft, a 6,000 km profile, diversion and loiter allowances, and target take-off/landing distances of 3,500 m and 2,000 m. The mission brief calls for 200 occupants: 195 passengers and five crew.",
                    "That profile matters because fuel burn, required thrust, runway performance, and wing size all change across climb, supersonic cruise, descent, reserve, and diversion. Historic supersonic transports supplied first estimates and a check on plausibility.",
                ],
                figures: [{ image: "assets/images/projects/dsa/page-09.png", alt: "Mission profile for the conceptual London-to-New-York supersonic transport", label: "Report page 9", caption: "The flight is broken into mission segments before any weight fraction is calculated." }],
            },
            {
                id: "sizing", kicker: "02 · Close the weight loop", title: "Iterate fuel fraction and empty mass to a take-off estimate",
                paragraphs: [
                    "The report uses segment-by-segment weight ratios, including a Breguet cruise estimate and allowances for reserve and trapped fuel. Historical empty-weight data are fitted to a weight relationship, then updated for the assumed composite structural weight reduction.",
                    "After a second pass using the chosen powerplant assumptions, the iterative calculation converges to about 251 tonnes maximum take-off mass: approximately 84.2 tonnes operating empty, 149.3 tonnes fuel, and 17.55 tonnes design payload. These are conceptual sizing estimates, not certified weights.",
                ],
                figures: [{ image: "assets/images/projects/dsa/page-23.png", alt: "Aircraft maximum take-off weight convergence over sizing iterations", label: "Weight convergence · report p. 23", caption: "The iteration settles after mission fuel fraction and empty-weight assumptions are made consistent." }],
            },
            {
                id: "constraints", kicker: "03 · Choose a design point", title: "Balance cruise, runway, and one-engine-inoperative cases",
                paragraphs: [
                    "The combined constraint diagram puts thrust-to-weight ratio against wing loading. Cruise, take-off, landing, and one-engine-inoperative climb limits bound the feasible region; the selected design point is about 4,487.7 N/m² wing loading and 0.3042 thrust-to-weight ratio.",
                    "At the estimated take-off weight, that point implies a wing area of about 548.5 m². The plot is a decision tool: moving the point helps one requirement but may worsen another.",
                ],
                figures: [{ image: "assets/images/projects/dsa/page-28.png", alt: "Combined aircraft constraint diagram showing the feasible design area and selected point", label: "Report page 28", caption: "The selected point sits within the jointly constrained design region." }],
            },
            {
                id: "geometry", kicker: "04 · Shape the aircraft", title: "Translate the chosen area into a supersonic layout",
                paragraphs: [
                    "The wing study compares delta and ogive planforms while checking the required area and a Mach-cone constraint. The report then builds a preliminary 3D aircraft model and considers airfoil thickness, low-speed handling, cabin geometry, the area rule, and vertical-tail sizing.",
                    "Several choices rely on historic data rather than a full aerodynamic optimization. The report explicitly notes that computational-fluid-dynamics capability was not available for final airfoil selection.",
                ],
                figures: [
                    { image: "assets/images/projects/dsa/page-36.png", alt: "Ogive wing planform design candidates and geometric parameters", label: "Report page 36", caption: "The planform is constrained by both target area and supersonic geometry." },
                    { image: "assets/images/projects/dsa/page-41.png", alt: "Orthogonal views of the conceptual supersonic aircraft 3D model", label: "Aircraft model · report p. 41", caption: "The 3D concept brings the wing, fuselage, and vertical tail into one configuration." },
                ],
            },
            {
                id: "outcome", kicker: "05 · Sizing result and limit", title: "The concept closes analytically, not experimentally",
                paragraphs: [
                    "The engine-sizing chapter checks take-off, climb, diversion, and cruise thrust. Its analytical estimates are approximately 848 kN total for the one-engine-inoperative take-off requirement, 703 kN for climb, and 270 kN for supersonic cruise, leading to a four-engine selection in the report.",
                    "This is a preliminary design exercise. Its mass, drag, thrust, and geometry depend on assumed historical data and simplified models; the report says CFD-based drag calculation and detailed validation remain outside its scope.",
                ],
                figures: [{ image: "assets/images/projects/dsa/page-50.png", alt: "Supersonic transport cruise-thrust calculation and selected powerplant table", label: "Report page 50", caption: "Engine choices are checked against the conceptual mission's calculated thrust requirements." }],
            },
        ],
        resources: [{ label: "Read full team report", url: "assets/reports/DSA_project-report.pdf" }],
    },
    sedsm: {
        area: "Aerodynamics · Unsteady-flow modeling",
        lead: "When an airfoil pitches through stall, lift depends on its motion history rather than angle alone. This team study implemented the ONERA and Snel semi-empirical models in MATLAB, compared their hysteresis predictions with published cases, and documented where independent CFD validation stopped.",
        tags: ["Dynamic stall", "ONERA model", "Snel model", "MATLAB", "Hysteresis"],
        metrics: [
            { value: "2", label: "semi-empirical models implemented" },
            { value: "NACA 4415", label: "airfoil used for model examples" },
            { value: "3", label: "stall regimes compared" },
        ],
        sections: [
            {
                id: "problem", kicker: "01 · The physical question", title: "Why a static lift curve cannot describe dynamic stall",
                paragraphs: [
                    "As an airfoil's angle of attack changes quickly, boundary-layer separation and vortices lag the motion. During a pitching cycle, the same angle can therefore have different lift on the upstroke and downstroke. The result is a hysteresis loop, important for rotorcraft, wind turbines, and maneuvering wings.",
                    "Full unsteady CFD can be expensive, while a purely static polar misses that history. The report explores semi-empirical models as a practical middle ground, driven by angle-of-attack history and calibrated coefficients.",
                ],
                figures: [{ image: "assets/images/projects/sedsm/page-04.png", alt: "Report diagram defining potential and static lift components for dynamic-stall modeling", label: "Report page 4", caption: "The static and extrapolated lift curves provide terms used by both dynamic models." }],
            },
            {
                id: "onera", kicker: "02 · First model", title: "ONERA separates attached-flow and stall-response loads",
                paragraphs: [
                    "The ONERA formulation adds a first-order response, most important below static stall, to a second-order term representing above-stall oscillations. The team interpolated NACA 4415 steady-lift data, imposed sinusoidal pitch motion, and solved the response numerically in MATLAB.",
                    "The second oscillation is used for plotting because the first cycle showed transient irregularities. The computed lift loops broadly follow the published reference at lower angles, with larger differences at higher angle of attack and frequency; the model also needs airfoil-specific empirical coefficients for best accuracy.",
                ],
                figures: [{ image: "assets/images/projects/sedsm/page-06.png", alt: "ONERA-model dynamic-lift hysteresis loop for a pitching airfoil", label: "ONERA loop · report p. 6", caption: "A single angle of attack maps to two lift values during the pitch cycle." }],
            },
            {
                id: "snel", kicker: "03 · Second model", title: "Snel adds two corrections to the static lift",
                paragraphs: [
                    "Snel starts with the static lift coefficient and adds a first-order forcing response plus a second-order high-frequency correction. Unlike the ONERA formulation used here, part of the second correction is nonlinear in its own state, so the MATLAB implementation uses an ODE solver.",
                    "The report recreates published comparison cases grouped as light, moderate, and deep stall. It finds the Snel model useful even without airfoil-specific tuning, but its numerical solution is less straightforward. The plots compare model curves with reference data; they are not new wind-tunnel measurements.",
                ],
                figures: [
                    { image: "assets/images/projects/sedsm/page-08.png", alt: "Light-stall comparison between the Snel model and published dynamic-lift results", label: "Report page 8", caption: "Light-stall cases test whether the correction terms reproduce the shape of the lift loop." },
                    { image: "assets/images/projects/sedsm/page-09.png", alt: "Moderate-stall comparison between Snel model and published data", label: "Moderate stall · report p. 9", caption: "The moderate-stall case tests the model beyond the light-stall loop." },
                    { image: "assets/images/projects/sedsm/page-09-deep.png", alt: "Deep-stall comparison between Snel model and published data", label: "Deep stall · report p. 9", caption: "Agreement becomes more difficult as the stall regime deepens." },
                ],
            },
            {
                id: "limit", kicker: "04 · Validation boundary", title: "The independent CFD comparison did not run",
                paragraphs: [
                    "The team outlined an OpenFOAM workflow and prepared case files to seek another comparison source. The report explicitly says this simulation did not run, so no CFD-derived validation dataset was produced.",
                    "The defensible conclusion is a model-to-published-reference comparison, with noted differences at stronger stall conditions and sensitivity to empirical parameters. Further validation would need working CFD or experimental data across more airfoils and flow conditions.",
                ],
                figures: [{ image: "assets/images/projects/sedsm/page-12.png", alt: "OpenFOAM setup directory and case-file explanation in the report", label: "Report page 12", caption: "The setup was documented, but the report states the OpenFOAM run did not complete." }],
            },
        ],
        resources: [{ label: "Read full team report", url: "assets/reports/SEDSM_project-report.pdf" }],
    },
    mbse: {
        area: "Systems engineering · Production operations",
        lead: "A production facility is more than a factory layout: orders, materials, schedules, finance, quality, and maintenance must exchange the right information. This team project mapped stakeholders to measurable requirements, designed an operational architecture for Etone's crane-component production, and proposed unit and integration tests.",
        tags: ["Stakeholder analysis", "Logical architecture", "KPIs", "Subsystem integration", "Verification"],
        metrics: [
            { value: "4", label: "operational subsystems" },
            { value: "19 + 5", label: "functional and system-level KPIs" },
            { value: "2", label: "verification protocols" },
        ],
        sections: [
            {
                id: "brief", kicker: "01 · The production challenge", title: "Expand production without losing sight of the whole system",
                paragraphs: [
                    "The poster frames a scenario in which Etone Enterprises, an equipment manufacturer, must redesign its facility to make construction parts for STS cranes while accommodating existing production lines. The project applies systems-engineering principles to the operations that would support that change.",
                    "Stakeholder analysis turns business, customer, supplier, safety, and operational concerns into key drivers. Those drivers become functional requirements and nonfunctional measures such as reliability, flexibility, maintainability, and cost effectiveness.",
                ],
                figures: [{ image: "assets/images/projects/mbse/poster-requirements.png", alt: "Selected functional KPIs mapped to production and product-quality key drivers", label: "Requirements · project poster", caption: "Key drivers become measurable targets, including production quality, product quality, and order delivery." }],
            },
            {
                id: "architecture", kicker: "02 · Define the operations", title: "Four subsystems share material, decisions, and failure information",
                paragraphs: [
                    "The logical architecture separates Production Planning & Control (PP&C), Finance & Inventory Management (F&IM), Production Flow & Design (PF&D), and Quality Control & Risk Mitigation (QC&RM). PP&C sequences work; F&IM plans purchases and stock; PF&D develops and monitors the factory flow; QC&RM feeds quality and maintenance actions back into the plan.",
                    "An N² interface matrix distinguishes material handoffs from information exchanges and marks additional information that appears when failures occur. A schedule change, for example, affects inventory orders and floor flow, while a quality incident must return corrective actions to planning.",
                ],
                figures: [{ image: "assets/images/projects/mbse/poster-architecture.png", alt: "N-squared interface matrix for four production-system subsystems and external stakeholders", label: "Architecture · project poster", caption: "The N² matrix marks interfaces between the four subsystems and external stakeholders." }],
            },
            {
                id: "verify", kicker: "03 · Prove the architecture", title: "Map every requirement to a test protocol",
                paragraphs: [
                    "The handout defines 19 functional KPIs and five nonfunctional, whole-system KPIs. A FunKey coupling matrix relates key drivers to functions; a subsystem–KPI mapping then identifies where each measure belongs.",
                    "Protocol 1 tests units through documentation, floor, efficiency, quality, and waste checks. Protocol 2 tests interactions in a virtual environment and later operational monitoring. Examples include stock left unused, machine defects, rework, and a maximum crane-boom-tip deflection check.",
                ],
                figures: [{ image: "assets/images/projects/mbse/poster-verification.png", alt: "Verification matrix mapping five unit tests to functional KPIs", label: "Verification · project poster", caption: "The matrix assigns each functional KPI to one or more unit-test types." }],
            },
            {
                id: "finding", kicker: "04 · The honest finding", title: "Architecture clarified the work, but key performance targets remained open",
                paragraphs: [
                    "The poster's conclusion says the system design helped distribute workload and make integration explicit. It also reports that the designed production system did not meet the required overall equipment effectiveness (OEE) and process-capability (Cpk) values in the team's verification analysis.",
                    "That makes this a systems-architecture and verification case, not a demonstrated factory optimization. The logical design provides a structure for another iteration of production layout and product flow to improve those metrics.",
                ],
            },
        ],
        resources: [
            { label: "View project poster", url: "assets/reports/MBSE_poster.pdf" },
            { label: "Read detailed handout", url: "assets/reports/MBSE_handout.pdf" },
        ],
    },
    ee1103: {
        area: "Numerical computing · Engineering applications",
        lead: "A collection of C implementations turns numerical methods into working engineering tools. The linked repository includes interpolation, LU-based cubic splines, ODE solvers for a magnetic-moment model, numerical integration, and correlation analysis—with assignment PDFs that plot errors and expose method trade-offs.",
        tags: ["C programming", "Interpolation", "ODE solvers", "Romberg integration", "Correlation"],
        metrics: [
            { value: "19", label: "numbered C source files in the repository" },
            { value: "2", label: "ODE solvers compared" },
            { value: "44.97°", label: "phase difference recovered by correlation" },
        ],
        sections: [
            {
                id: "scope", kicker: "01 · The toolkit", title: "Build methods, then test them on real data shapes",
                paragraphs: [
                    "The repository progresses from file handling and small algorithms to interpolation, solving ordinary differential equations, quadrature, and signal correlation. Each task pairs code with an assignment output or plot so behavior can be inspected, not merely asserted.",
                    "The case study follows four connected applications: reconstructing a sampled magnetic-field series, integrating a magnetic-moment ODE, estimating an area, and recovering the delay between two signals. This is a set of course exercises rather than one monolithic solver.",
                ],
            },
            {
                id: "interpolation", kicker: "02 · Reconstruct sampled data", title: "Compare linear interpolation with LU-based cubic splines",
                paragraphs: [
                    "The interpolation code downsamples a data series and reconstructs intermediate magnetic-field values. Later files assemble the cubic-spline equations and use LU decomposition to solve for spline coefficients, then profile the interpolation routine.",
                    "The accompanying PDFs plot original and reconstructed traces and squared error for different downsampling constants. The central trade-off is visible: retaining fewer points is cheaper, but rapid variation is harder to reconstruct accurately.",
                ],
                figures: [
                    { image: "assets/images/projects/ee1103/spline-01.png", alt: "Original magnetic-field data and interpolated curve from LU-based cubic spline exercise", label: "Spline assignment, page 1", caption: "Interpolation reconstructs intermediate values from sparse magnetic-field samples." },
                    { image: "assets/images/projects/ee1103/spline-05.png", alt: "Squared interpolation error versus downsampling constant", label: "Spline assignment, page 5", caption: "The assignment evaluates error as sample spacing changes." },
                ],
            },
            {
                id: "ode", kicker: "03 · Solve a dynamic system", title: "Compare midpoint and fourth-order Runge–Kutta on magnetic-moment motion",
                paragraphs: [
                    "The ODE exercise solves a Landau–Lifshitz–Gilbert-style magnetic-moment model using midpoint and fourth-order Runge–Kutta steps. The source code compares the resulting components and varies step size and damping parameter α.",
                    "Its plots report component-wise error over time, RMS error versus step size, switching time versus damping, and the path traced by the normalized magnetic vector. Those checks connect solver settings to physically meaningful behavior instead of reporting only runtime.",
                ],
                figures: [
                    { image: "assets/images/projects/ee1103/ode-04.png", alt: "RMS error versus step size for numerical ODE solution", label: "ODE assignment, page 4", caption: "Step size is tested as an accuracy parameter rather than chosen invisibly." },
                    { image: "assets/images/projects/ee1103/ode-06.png", alt: "Magnetic-moment switching time versus damping parameter alpha", label: "ODE assignment, page 6", caption: "The modeled switching time changes as damping is varied." },
                ],
            },
            {
                id: "integration", kicker: "04 · Improve quadrature", title: "Use Romberg extrapolation on top of trapezoid estimates",
                paragraphs: [
                    "Separate C routines integrate sampled data and functions with the trapezoid rule, then build a Romberg table from successively refined trapezoid estimates. The assignment documents the table indexing and profiles the routines at different step counts.",
                    "The area-versus-step-size plot makes numerical convergence tangible: the computed integral changes with the chosen discretization. Romberg extrapolation aims to improve accuracy by combining multiple resolutions, while requiring additional evaluations.",
                ],
                figures: [{ image: "assets/images/projects/ee1103/integration-01.png", alt: "Romberg integration assignment showing the extrapolation table and trapezoid base values", label: "Integration assignment, page 1", caption: "Romberg combines a sequence of trapezoid estimates into higher-order corrected values." }],
            },
            {
                id: "correlation", kicker: "05 · Recover signal timing", title: "Estimate phase from the correlation peak",
                paragraphs: [
                    "The final repository exercise computes the correlation of two 20 kHz sinusoidal signals as one is delayed relative to the other. The assignment reports a known 45° phase difference and a 44.97° result recovered by the implemented correlation procedure.",
                    "The delay plots also show the coefficient weakening near the data-window edge, a reminder that finite record length affects correlation estimates. Together, these exercises show a practical pattern: implement the method, plot an error or diagnostic, and interpret the numerical limits.",
                ],
                figures: [{ image: "assets/images/projects/ee1103/correlation-02.png", alt: "Correlation coefficient against delay for two sinusoidal signals", label: "Correlation assignment, page 2", caption: "The correlation peak identifies the relative delay used for the phase estimate." }],
            },
        ],
        resources: [
            { label: "View code and assignment PDFs", url: "https://github.com/kirtan2605/Numerical-Methods" },
            { label: "Open ODE results", url: "https://github.com/kirtan2605/Numerical-Methods/blob/master/Error%26Plot_Solved_ODE_Final.pdf" },
            { label: "Open correlation study", url: "https://github.com/kirtan2605/Numerical-Methods/blob/master/Correlation%20Study%20Assignment.pdf" },
        ],
    },
};
